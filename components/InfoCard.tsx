import { View,Text, TouchableOpacity } from 'react-native'


interface InfoCardProps {
    name: string;
    age: number;
    sex: string;
    setName?: (data: any) => void;
}

export default (props: InfoCardProps) => {
    const { name, age , sex, setName } = props
    return (
        <TouchableOpacity onPress={()=>{setName?.('eren yeager')}}>
            <Text>==================</Text>
            <Text style={{fontSize: 20, color: 'orange'}}>{name}</Text>
            <Text style={{fontSize: 20, color: 'orange'}}>{age}</Text>
            <Text style={{fontSize: 20, color: 'orange'}}>{sex}</Text>
            <Text>==================</Text>
        </TouchableOpacity>
    );
}