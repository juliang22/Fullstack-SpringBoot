import { LoadingOutlined } from '@ant-design/icons'
import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from 'antd'
import { useState } from 'react'

import { useAddStudent } from '../hooks/useStudents'
import { IStudent } from '../types/Students'

const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface StudentDrawerProps {
	showDrawer: boolean
	setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}


function StudentDrawerForm({ showDrawer, setShowDrawer }: StudentDrawerProps) {
	const [student, setStudent] = useState<IStudent>({
		name: "",
		email: "",
		gender: "",
	})
	const { mutate, isError, isLoading } = useAddStudent(student)

	const onClose = () => setShowDrawer(false);

	const onFinish = () => {
		mutate(student)
		console.log(isError);
		onClose()
	};

	const onFinishFailed = (errorInfo: any) => {
		alert(JSON.stringify(errorInfo, null, 2));
	};

	return (
		<Drawer
			title="Create new student"
			width={720}
			onClose={onClose}
			visible={showDrawer}
			bodyStyle={{ paddingBottom: 80 }}
			footer={
				<div
					style={{
						textAlign: 'right',
					}}
				>
					<Button onClick={onClose} style={{ marginRight: 8 }}>
						Cancel
					</Button>
				</div>
			}
		>
			<Form layout="vertical"
				onFinishFailed={onFinishFailed}
				onFinish={onFinish}
				hideRequiredMark>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="name"
							label="Name"
							rules={[{ required: true, message: 'Please enter student name' }]}
						>
							<Input
								placeholder="Please enter student name" value={student.name}
								onChange={e => setStudent({ ...student, name: e.target.value })}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="email"
							label="Email"
							rules={[{ required: true, message: 'Please enter student email' }]}
						>
							<Input
								placeholder="Please enter student email"
								value={student.email}
								onChange={e => setStudent({ ...student, email: e.target.value })}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name="gender"
							label="gender"
							rules={[{ required: true, message: 'Please select a gender' }]}
						>
							<Select
								placeholder="Please select a gender"
								onChange={gender => setStudent({ ...student, gender })}
							>
								<Option value="MALE">MALE</Option>
								<Option value="FEMALE">FEMALE</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Form.Item >
							<Button type="primary" htmlType="submit" >
								Submit
							</Button>
						</Form.Item>
						<Row>
							{isLoading && <Spin indicator={antIcon} />}
						</Row>
					</Col>
				</Row>
			</Form>
		</Drawer>)
}

export default StudentDrawerForm;