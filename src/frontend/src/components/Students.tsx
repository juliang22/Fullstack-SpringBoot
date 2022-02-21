import React from 'react'
import { useQuery } from 'react-query'
import { useGetAllStudents } from '../hooks/useStudents'

//type Props = {}

const Students = () => {
	const { isLoading, isError, data } = useGetAllStudents()
	if (isLoading) return <h1>Loading...</h1>
	if (isError) return <h1>Error...</h1>
	return (
		<div>{JSON.stringify(data)}</div>
	)
}

export default Students