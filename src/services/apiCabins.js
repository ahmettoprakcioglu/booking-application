import { generateUniqueId } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${generateUniqueId()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([
      { ...newCabin, image: imagePath }
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // Upload Image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
      cacheControl: '3600',
      upsert: false
    })
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);

    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;

}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}