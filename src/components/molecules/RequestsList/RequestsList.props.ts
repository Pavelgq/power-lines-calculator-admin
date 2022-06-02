import React, { ReactComponentElement, ReactNode } from "react";
import { RootState } from "../../../store/store";
import {ClientTableProps} from '../ClientTable/ClientTable.props'

export interface RequestsListProps {
  Component: (props: ClientTableProps) => JSX.Element;
  selectForIds: (state: RootState) => string[]
}