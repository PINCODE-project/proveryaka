import { AxiosError } from 'axios';
import { UseMutationOptions } from 'react-query';

export type AxiosUseMutationOptions<TData, TArgs> = Omit<UseMutationOptions<TData, AxiosError, TArgs>, 'mutationFn'>;
