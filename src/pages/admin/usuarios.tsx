import { NextPage } from 'next';
import useSWR from 'swr';
import { useContext, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, MenuItem, Select } from '@mui/material';
import { DashboardOutlined as DashboardOutlinedIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { UserContext } from '@/context';
import { AdminLayout } from "@/components/Layouts"

import { UserRole, UserRoleOptions } from '@/constants';
import { ShortUser } from '@/interfaces';
import { User } from '@/utils';


const UsersPage: NextPage = () => {
  const snackController = useSnackbar()
  const { data, isLoading, mutate } = useSWR<ShortUser[]>('/api/admin/users')
  const { updateUserRole } = useContext(UserContext)

  const onUpdateUserRole = async (userId: string, role: UserRole) => {
    try {
      await updateUserRole(userId, role)
      await mutate(data!.map(user => user._id === userId ? { ...user, role } : user));
    } catch (error: any) {
      snackController.enqueueSnackbar(error.message ?? 'Algo salio mal', { variant: 'error' })
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    { field: 'email', headerName: 'Correo', width: 250 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: (({ row }) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            sx={{ width: 300 }}
            onChange={event => onUpdateUserRole(row.id, event.target.value)}
          >
            {UserRoleOptions.map(({ label, value }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
        )
      })
    },
  ]

  const rows = useMemo(() =>
    (data ?? []).map(({ email, firstName, lastName, role, _id }) => ({
      id: _id,
      name: User.getFullName({ firstName, lastName }),
      email,
      role
    })), [data])

  if (isLoading) return <></>

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Mantenimiento de usuarios"
      icon={<DashboardOutlinedIcon />}
    >
      <Grid className='fadeIn' container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default UsersPage 