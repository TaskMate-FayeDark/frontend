import {useParams} from "@tanstack/react-router";
export const ProfileIndex: React.FC = () => {
    const {index} = useParams({strict:false})
    return (
        <>{index}</>
    )
}