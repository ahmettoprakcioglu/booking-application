import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    const errorMessage = 'Cabins could not be loaded';
    console.error(errorMessage);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}