import {useParams} from "@tanstack/react-router";

export const CardItem = () => {
    const {idCard} = useParams({strict: false})
    return (
        <div>{idCard}</div>
    )
}