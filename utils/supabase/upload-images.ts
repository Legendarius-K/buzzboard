import { createClient } from "./server"
import {v4 as uuid} from 'uuid'

export const uploadImage = async (image: File) => {
    const supabase = createClient()

    const imageName = image.name.split('.')
    const path = `${image.name[0]}-${uuid()}`
}