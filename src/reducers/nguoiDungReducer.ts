import { NguoiDung } from '_types/NguoiDung'

const SET_USER = 'SET_USER'

export const nguoiDungInitialState: userStateType = {
  //   thongTin: {
  //     id: undefined,
  //     soDiem: undefined,
  //     hoTen: undefined,
  //     cif: undefined,
  //     soDienThoai: undefined,
  //     mail:undefined,
  //     ngayThangNamSinh: undefined,
  //   },
  thongTin: undefined,
}

export type userStateType = {
  thongTin?: NguoiDung
}

export type nguoiDungActionType = {
  type: typeof SET_USER
  payload?: NguoiDung | any
}

export const nguoiDungReducer = (
  state: userStateType,
  action: nguoiDungActionType
) => {
  switch (action.type) {
    case SET_USER:
      return {
        thongTin:
          action.payload === undefined ? undefined : { ...state, ...action.payload },
      }
    default: {
    }
  }
}
