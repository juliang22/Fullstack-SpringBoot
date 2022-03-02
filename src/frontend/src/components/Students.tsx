import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table, Badge, Tag, Popconfirm, Radio } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import axios from 'axios';
import { useGetAllStudents } from '../hooks/useStudents'
import StudentDrawerForm from './StudentDrawerForm';
import { IStudent } from '../types/Students';
import { errorNotification, successNotification } from './Notifications';
import { StudentAvatar } from './IStudentAvatar';

const Students = () => {
	const { isLoading, isFetching, isError, data } = useGetAllStudents()
	const queryClient = useQueryClient()
	const { mutate: deleteMutate } = useMutation<any, Error, IStudent>(student => axios.delete(`api/v1/students/${student.id}`), {
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries('getAllStudents')
			successNotification("Student deleted successfully", `${data} was successfull deleted`)
			console.log(JSON.stringify(data));
		},
		onError: (error) => {
			errorNotification("Error", `${error}`)
		}
	})
	const [showDrawer, setShowDrawer] = useState(false);

	const columns = [
		{
			title: '',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (text: string, student: IStudent) => <StudentAvatar name={student.name} />
		},
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'gender',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: 'actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (text: string, student: IStudent) => <>
				<Radio.Group>
					<Popconfirm
						placement='topRight'
						title={`Are you sure to delete ${student.name}`}
						onConfirm={() => deleteMutate(student)}
						okText='Yes'

						cancelText='No'>
						<Radio.Button value="small">Delete</Radio.Button>
					</Popconfirm>
					<Radio.Button value="small">Edit</Radio.Button>
				</Radio.Group>
			</>
		},
	]
	if (isLoading || isFetching) return <LoadingOutlined style={{ fontSize: 24 }} spin />
	if (isError) return <h1>Error whoopsy</h1>
	return (
		<>
			<StudentDrawerForm
				setShowDrawer={setShowDrawer}
				showDrawer={showDrawer} />
			<Table
				dataSource={data}
				columns={columns}
				key={data.id}
				bordered
				title={() => (
					<>
						<Button
							onClick={() => setShowDrawer(!showDrawer)}
							type="primary"
							shape="round"
							icon={<PlusOutlined />} size="small">
							Add New Student
						</Button>
						<Tag style={{ marginLeft: '10px' }}>Number of students</Tag>
						<Badge count={data.length} className="site-badge-count-4" />
					</>
				)}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
				rowKey={() => data.id}
			/>
		</>
	)
}

export default Students