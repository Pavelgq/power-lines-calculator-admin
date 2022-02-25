import { Container, SelectChangeEvent } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActionList } from "../../components/molecules/ActionList/ActionList";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  getAllActions,
  selectCurrentActions,
  selectIsLoadingActions,
  selectTotalActions,
} from "../../store/actionStore";

const programs = [
  {
    name: "Все",
    value: 0,
  },
  {
    name: "Экран",
    value: 1,
  },
  {
    name: "Кабель",
    value: 2,
  },
  {
    name: "Труба",
    value: 3,
  },
];

export function AllActions() {
  const { clientId } = useParams();

  const [token] = useLocalStorage("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [programType, setProgramType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const clientActions = useSelector(selectCurrentActions);
  const totalItems = useSelector(selectTotalActions);
  const isLoading = useSelector(selectIsLoadingActions);
  const dispatch = useDispatch();

  const filters = useRef();

  return (
    <main>
      <Container>
        <ActionList clientId={clientId} />
      </Container>
    </main>
  );
}
