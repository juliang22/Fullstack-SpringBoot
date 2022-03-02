import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

interface IStudentAvatar {
	name: string;
}
export const StudentAvatar = ({ name }: IStudentAvatar) => {
	const trim = name.trim();
	if (trim.length === 0)
		return <Avatar icon={UserOutlined} />;
	if (trim.split(" ").length === 1)
		return <Avatar>{name.charAt(0)}</Avatar>;
	return <Avatar>`${name.charAt(0)}${name.charAt(name.length - 1)}`</Avatar>;
};
