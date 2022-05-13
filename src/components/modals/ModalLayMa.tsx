import Login from '@component/sessions/Login'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import donHangServices from '@services/donHangServices'
import { useSession } from 'next-auth/react'
import React, { FC, useState } from 'react'
import { Product } from '_types/Product'
interface ModalLayMaProps {
  open: boolean
  setOpen: any
  sanPham: Product
}

const ModalLayMa: FC<ModalLayMaProps> = ({ open, setOpen, sanPham }) => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen && setOpen(false)
  }
  const onSubmit = async () => {
    setLoading(true)
    const data = {
      productId: sanPham?.id,
      site_customerId: session?.user?.cif || 2,
      quantity: 1,
    }
    try {
      const res = await donHangServices.postDonHang(data)
      if (res) {
        // handleClickOpenXemMa(res?.data?.data)
        alert('Đổi điểm thành công')
      }
    } catch (error) {
      alert('Lỗi đổi điểm')
    }
    setOpen(false)
    setLoading(false)
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        scroll="body"
        fullWidth={session?.user ? true : false}
        maxWidth={session?.user ? 'sm' : 'sm'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!session?.user ? (
          <Login />
        ) : (
          <React.Fragment>
            <DialogTitle id="alert-dialog-title">Đổi điểm</DialogTitle>
            <Divider />
            <DialogContent>Bạn thật sự muốn đổi lấy voucher này</DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                Hủy
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Xác nhận đổi điểm
              </LoadingButton>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  )
}
export default ModalLayMa
