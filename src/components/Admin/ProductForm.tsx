import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import {
  Box, Button, Card, CardActions, CardMedia,
  Checkbox, Chip, Divider, FormControl, FormControlLabel,
  FormGroup, FormLabel, Grid, Radio,
  RadioGroup, TextField
} from '@mui/material';
import {
  SaveOutlined as SaveOutlinedIcon,
  UploadOutlined as UploadOutlinedIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { Size, SizeEnum } from '@/constants';
import { adminDataSource } from '@/datasources';
import {
  Category, Product,
  ProductFormData, SubCategory
} from '@/interfaces';

interface Props {
  product: Product
  categories: Category[]
  subCategories: SubCategory[]
}

export const ProductForm: FC<Props> = ({ product, categories, subCategories }) => {
  const router = useRouter()

  const snackbarController = useSnackbar()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register, handleSubmit, getValues,
    setValue, watch, formState: { errors, isSubmitting },
    control
  } = useForm<Omit<ProductFormData, '_id'>>({ defaultValues: product })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name !== 'title') return

      const newSlug = value.title?.trim()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
        .toLocaleLowerCase() ?? ''

      setValue('slug', newSlug, { shouldValidate: true })
    })

    return () => subscription.unsubscribe()
  }, [watch, setValue])

  const onChangeSize = (size: Size) => {
    const currentSizes = getValues('sizes')

    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(_size => _size !== size)
      : [...currentSizes, size]

    setValue('sizes', newSizes, { shouldValidate: true })
  }

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return

    try {
      for (const file of target.files) {
        const formData = new FormData()
        formData.append('file', file)
        const imageUrl = await adminDataSource.uploadFile(formData)
        setValue('images', [...getValues('images'), imageUrl], { shouldValidate: true })
      }
    } catch (error) {
      console.error(error)
      snackbarController.enqueueSnackbar('Hubo un error al subir la imagen', { variant: 'error' })
    }
  }

  const onDeleteImage = (image: string) => {
    const newImages = getValues('images').filter(_image => _image !== image)
    setValue('images', newImages, { shouldValidate: true })
  }

  const onSubmit = async (formData: Omit<ProductFormData, '_id'>) => {
    if (formData.images.length < 2) return snackbarController.enqueueSnackbar('Minimo 2 imagenes', { variant: 'error' })

    try {

      if (product._id) {
        await adminDataSource.updateProduct({ ...formData, _id: product._id })
        return
      }

      await adminDataSource.createProduct(formData)
      router.replace(`/admin/productos/${formData.slug}`)
    } catch (error) {
      console.error(error)
      snackbarController.enqueueSnackbar('Hubo un error al actualizar el producto', { variant: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button
          color="secondary"
          variant='contained'
          startIcon={<SaveOutlinedIcon />}
          sx={{ width: 150 }}
          type="submit"
          disabled={isSubmitting}
        >
          Guardar
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Título"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register('title', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            disabled={isSubmitting}
          />

          <TextField
            label="Descripción"
            variant="filled"
            fullWidth
            multiline
            sx={{ mb: 1 }}
            {...register('description', {
              required: 'Este campo es requerido'
            })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            disabled={isSubmitting}
          />

          <TextField
            label="Inventario"
            type='number'
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register('inStock', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'Mínimo de valor 0' },
            })}
            error={Boolean(errors.inStock)}
            helperText={errors.inStock?.message}
            disabled={isSubmitting}
          />

          <TextField
            label="Precio"
            type='number'
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register('price', {
              required: 'Este campo es requerido',
              min: { value: 0, message: 'Mínimo de valor 0' },
            })}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            disabled={isSubmitting}
          />

          <Divider sx={{ my: 1 }} />

          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Categoria</FormLabel>

            <Controller
              name='categoryId'
              control={control}
              disabled={isSubmitting}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field }) => {
                console.log("🚀 ~ file: ProductForm.tsx:226 ~ field:", field)
                return (
                  <RadioGroup {...field} row  >
                    {
                      categories.map(category => (
                        <FormControlLabel
                          disabled={isSubmitting}
                          key={category._id}
                          value={category._id}
                          control={<Radio color='secondary' />}
                          label={category.title}
                        />
                      ))
                    }
                  </RadioGroup>
                )
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Sub Categoria</FormLabel>
            <Controller
              name='subCategoryId'
              control={control}
              disabled={isSubmitting}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field }) => {
                console.log("🚀 ~ file: ProductForm.tsx:253 ~ field:", field)
                return (
                  <RadioGroup {...field} row  >
                    {
                      subCategories.map(subCategory => (
                        <FormControlLabel
                          disabled={isSubmitting}
                          key={subCategory._id}
                          value={subCategory._id}
                          control={<Radio color='secondary' />}
                          label={subCategory.title}
                        />
                      ))
                    }
                  </RadioGroup>
                )
              }}
            />
          </FormControl>

          <FormGroup>
            <FormLabel>Tallas</FormLabel>
            {
              SizeEnum.map(size => (
                <FormControlLabel
                  key={size}
                  disabled={isSubmitting}
                  onChange={() => onChangeSize(size)}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size} />
              ))
            }
          </FormGroup>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Slug - URL"
            variant="filled"
            fullWidth
            sx={{ mb: 1 }}
            {...register('slug', {
              required: 'Este campo es requerido',
              validate: (value) => value.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
            })}
            error={!!errors.slug}
            helperText={errors.slug?.message}
            disabled={isSubmitting}
          />

          <Divider sx={{ my: 2 }} />

          <Box display='flex' flexDirection="column">
            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
            <Button
              color="secondary"
              fullWidth
              onClick={() => fileInputRef.current?.click()}
              startIcon={<UploadOutlinedIcon />}
              sx={{ mb: 3 }}
              disabled={isSubmitting}
            >
              Cargar imagen
              <input
                ref={fileInputRef}
                type='file'
                multiple
                onChange={onFileSelected}
                accept='image/png, image/gif, image/jpg'
                style={{ display: 'none' }}
              />
            </Button>

            <Chip
              label="Es necesario al 2 imagenes"
              color='error'
              variant='outlined'
              sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
            />

            <Grid container spacing={2}>
              {
                getValues('images').map(img => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component='img'
                        className='fadeIn'
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          onClick={() => onDeleteImage(img)}
                          fullWidth
                          disabled={isSubmitting}
                          color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
