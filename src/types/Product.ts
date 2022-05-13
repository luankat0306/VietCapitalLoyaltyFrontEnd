export interface Product {
  id?: string
  title?: string
  image?: string
  content?: string
  price?: string
  brand?: string
  quantity?: string
  type?: string
  office?: Address[]
}
export interface Address {
  address?: string
  address_en?: string
  city_id?: string
  latitude?: string
  longitude?: string
  brand_id?: string
  district_id?: string
  ward_id?: string
  code?: string
  number?: string
  phone?: string
  geo?: string
  isApply?: string
  id?: string
  title_city?: string
}
