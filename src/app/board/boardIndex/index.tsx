import {useParams} from "@tanstack/react-router";

export const BoardIndex = () => {
    const {bid} = useParams({strict: false})
    return (
        <>
            {bid}
        </>
    )
}