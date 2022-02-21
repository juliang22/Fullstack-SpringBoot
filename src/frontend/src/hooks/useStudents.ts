import axios from 'axios'
import { useQuery } from 'react-query';

const getAllStudents = async () => {
	const { data } = await axios.get(
		`api/v1/students`
	)
	return data
}

export const useGetAllStudents = () => {
	return useQuery('getAllStudents', getAllStudents)
};