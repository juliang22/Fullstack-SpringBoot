import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { IStudent } from '../types/Students'
import { errorNotification, successNotification } from '../components/Notifications';

export const useGetAllStudents = () => {
	const getAllStudents = async () => {
		const { data } = await axios.get(
			`api/v1/students`
		)
		return data
	}
	return useQuery('getAllStudents', getAllStudents)
};

export const useAddStudent = (student: IStudent) => {
	const queryClient = useQueryClient()
	return useMutation<IStudent, Error, IStudent>(student => axios.post(`api/v1/students`, student), {
		onSuccess: () => {
			queryClient.invalidateQueries('getAllStudents')
			successNotification("Student added successfully", `${student.name} was successfull added`)
		},
		onError: (error) => {
			errorNotification("Error", `${error}`)
		}
	})
}



