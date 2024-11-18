import {useParams} from "@tanstack/react-router";

export const WorkAreaUser = () => {
    const {idUser} = useParams({strict: false});
    return (
        <>
            {idUser}
        </>
    )
}