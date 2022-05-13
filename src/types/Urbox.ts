export interface Urbox {
  donViCungCap?: string
  items_id: string
  items_cat_id?: string
  items_cat_title?: string
  items_gift_id?: string
  items_title?: string
  items_price?: number
  items_quantity?: number
  items_stock?: number
  items_image?: string
  items_images?: {
    '0'?: string
    '80'?: string
    '160'?: string
    '320'?: string
    '640'?: string
    square?: string
  }
  items_images_rectangle?: any[]
  items_expire_duration?: string
  items_brandImage?: string
  items_brand_name?: string
  items_content?: string
  items_note?: string
}
