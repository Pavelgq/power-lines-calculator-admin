import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../../store/store";


export const Actions = ({}) => {
  const { clientId } = useParams();

  const clients = useSelector((state: RootState) => state.clients)
  const dispatch = useDispatch();

  useEffect(( ) => {

  }, [])

  return (
    <>
      client {clientId}
    </>
  )
}