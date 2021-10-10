import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Launch, Payloads} from "../../types";
import {Checkbox, Skeleton} from '@mui/material';
import moment from "moment";
import {CSSProperties} from "react";
import {toast} from "react-toastify";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: any) => string;
    reduce?: (value: any[]) => number;
    style?: (value: any) => CSSProperties;
}

const columns: readonly Column[] = [
    { id: 'compare', label: 'Compare', minWidth: 20, align: 'center' },
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'mission_name', label: 'Mission Name', minWidth: 70 },
    {
        id: 'launch_date',
        label: 'Launch Date',
        minWidth: 50,
        format: (value: any) =>
            `${moment(value).format('DD/MM/YYYY')}(${moment(value).fromNow()})`,
    },
    {
        id: 'rocket_name',
        label: 'Rocket Name',
        minWidth: 50,
    },
    {
        id: 'payload_mass',
        label: 'Payload Total Mass',
        minWidth: 50,
        align: 'right',
        reduce: (value: Payloads[]) => value.reduce((acc, item) => acc + item.payload_mass_kg, 0),
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'total_ship',
        label: 'Total Ships',
        minWidth: 50,
        align: 'right'
    },
    {
        id: 'status',
        label: 'Launch Status',
        minWidth: 50,
        align: 'center',
        format: (value: boolean) => (value ? 'Success' : 'Failed').toUpperCase(),
        style: (value: string) => {
            return {
                color: value === 'SUCCESS' ? 'green': 'red',
                fontWeight: 500,
            }
        }
    },
];

type Data = Launch

interface Props {
    rows: Array<Data>
    loading?: boolean
    reFetch?: () => void
    stopReFetch?: boolean
    onCompareSelect?: (id: string, checked: boolean) => void
    selected: string[]
}

function getValueFromId(data: Data, id: string): any {
    switch (id) {
        case 'id':
            return data.id
        case 'mission_name':
            return data.mission_name
        case 'rocket_name':
            return data.rocket.rocket_name
        case 'launch_date':
            return data.launch_date_local
        case 'total_ship':
            return data.ships.length
        case 'payload_mass':
            return data.rocket.second_stage.payloads
        case 'status':
            return data.launch_success ? 'SUCCESS' : 'FAILED'
        default:
            return 'No Data';
    }
}

export const DataTables:React.FC<Props> = ({
   rows,
   loading,
   reFetch,
   stopReFetch,
   onCompareSelect,
   selected,
}) => {

    const onScroll = (event: any) => {
        if(reFetch && !stopReFetch) {
            const {scrollHeight, scrollTop, offsetHeight} = event.target
            if(scrollHeight - scrollTop - offsetHeight <= 300) {
                reFetch()
            }
        }
    }

    const onSelectCompare = (id: string) => {
        return (e: any) => {
            const checked = e.target.checked
            if(onCompareSelect) {
                onCompareSelect(id, checked)
            }
        }
    }

    const compareClick = (e: any) => {
        const checked = e.target.checked
        if (selected.length === 2 && checked) {
            e.preventDefault()
            toast.warn('Max 2 selections allowed, please unselect previous one')
        }
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: '50ch' }} onScroll={onScroll}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={'table-body'}>
                        {rows
                            .map((row, rIndex) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={rIndex}
                                        style={{
                                            backgroundColor:  row.launch_success ? undefined : '#ffd2d2',
                                        }}
                                        className={`data`}
                                    >
                                        {columns.map((column) => {
                                            const data = getValueFromId(row, column.id)

                                            const reduce = column.reduce ? column.reduce(data) : data

                                            const format = column.format ? column.format(reduce) : reduce

                                            return <TableCell padding="checkbox"
                                                              key={column.id}
                                                              align={column.align}
                                                              style={column.style ? column.style(data) : undefined}
                                                              className={column.id === 'id' ? `row-id` : 'data-cell'}
                                                >
                                                {column.id === 'compare' ? <Checkbox
                                                        color="primary"
                                                        onChange={onSelectCompare(row.id)}
                                                        onClick={compareClick}
                                                        disabled={selected.length >= 2 && !selected.includes(row.id)}
                                                        id={`check-${row.id}`}
                                                    />
                                                    : <>
                                                            {format}
                                                    </>
                                                }
                                            </TableCell>
                                        })}
                                    </TableRow>
                                );
                            })}
                        { loading ? <>
                                {Array.from(Array(7)).map((_, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell colSpan={columns.length}>
                                                <Skeleton animation={'wave'} style={{width: '100%', height: '30px'}}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </>
                            : <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
