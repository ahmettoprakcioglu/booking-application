import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from './FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
  
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: err => toast.error(err.message)
  });


  const onSubmit = data => {    
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', 
            { required: 'This field is required' }
          )}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', 
            { required: 'This field is required',
              min: {
                value: 1,
                message: 'Capacity should be at least 1'
              }
            }
          )}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register('regularPrice', 
            { required: 'This field is required',
              min: {
                value: 100,
                message: 'Regular price should be at least 100'
              }
            }
          )}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          {...register('discount', 
            { required: 'This field is required',
              validate: value => value <= getValues().regularPrice || 'Discount should be less than the regular price'
            }
          )}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isLoading}
          defaultValue=""
          {...register('description', 
            { required: 'This field is required' }
          )}
        />
      </FormRow>

      <FormRow label='Cabin photo' error=''>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', 
            { required: 'This field is required' }
          )}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
