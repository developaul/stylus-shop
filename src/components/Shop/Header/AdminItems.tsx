import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, GridDirection, styled } from '@mui/material'
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon
} from '@mui/icons-material';


interface Props {
  direction: GridDirection
  gap: number
}

const ButtonStyled = styled(Button)(
  ({ theme }) => `
  text-transform: capitalize;
  font-weight: 400;
  color: ${theme.palette.common.black};
`)

export const AdminItems: FC<Props> = ({ direction, gap }) => {

  const router = useRouter()

  const navigate = (path: string) => () => router.push(path)

  return (
    <Grid container direction={direction} gap={gap} >
      <Grid item>
        <ButtonStyled
          onClick={navigate('/admin/dashboard')}
          startIcon={<DashboardOutlinedIcon color='info' />}
        >
          Dashboard
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          onClick={navigate('/admin/productos')}
          startIcon={<CategoryOutlinedIcon color='info' />}
        >
          Productos
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          onClick={navigate('/admin/ordenes')}
          startIcon={<ConfirmationNumberOutlinedIcon color='info' />}
        >
          Ordenes
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          onClick={navigate('/admin/usuarios')}
          startIcon={<AdminPanelSettingsIcon color='info' />}
        >
          Usuarios
        </ButtonStyled>
      </Grid>
    </Grid>
  )
}
