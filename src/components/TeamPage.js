import { Row, Col, Input, Select, Table, Modal, Space, Button } from 'antd';
import './style.css'
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import { useCallback } from 'react';

function TeamPage() {
    const columns = [
        {
            key: 'data',
            title: 'Pending Members',
            dataIndex: 'data',
            render: (data) =>
                <Row>
                    <Col>
                        <div style={{ alignContent: 'center', textAlign: 'center', height: '50px', width: '50px', borderRadius: '25px', backgroundColor: '#D0D5DD' }}>{data.name[0]}{data.surname[0]}</div>
                    </Col>
                    <Col push={1}>
                        {data.name} {data.surname}
                        <div className='secondary'>{data.email}</div>
                    </Col>
                    <Col push={6}>
                        {data.state == 'Pending' ?
                            <div style={
                                {
                                    padding: '5px',
                                    borderRadius: '20px',
                                    opacity: 0.5,
                                    backgroundColor: '#D0D5DD',
                                    color: '#70798D',
                                }
                            }>Pending</div>
                            : <div style={
                                {
                                    padding: '5px',
                                    borderRadius: '20px',
                                    opacity: 0.5,
                                    backgroundColor: '#F9623B',
                                    color: '#BC3930',
                                }
                            }>Expired</div>}
                    </Col>
                </Row>,
        },
        {
            key: 'date',
            title: 'Date Invited',
            dataIndex: 'date',
            render: (date) => <p>{date}</p>
        },
        {
            key: 'roles',
            title: 'Roles',
            dataIndex: 'roles',
            render: (roles) => <p>{roles}</p>
        },
        {
            key: 'action',
            title: 'Action',
            render: (record) =>
                <Row>
                    {record.data.state == 'Pending' ?
                        <><Col></Col><Col push={12}>
                            <Button type='default' onClick={() => { Delete(record) }}>Cancel</Button>
                        </Col></>
                        : <><Col>
                            <Button type='primary'>Resend</Button>
                        </Col><Col push={4}><Button type='default' onClick={() => { Delete(record) }}>Cancel</Button>
                            </Col></>
                    }
                </Row>
        },
    ];
    const columns2 = [
        {
            key: 'data2',
            title: 'Team Members',
            dataIndex: 'data2',
            render: (data2) =>
                <Row>
                    <Col>
                        <div style={{ alignContent: 'center', textAlign: 'center', height: '50px', width: '50px', borderRadius: '25px', backgroundColor: '#D0D5DD' }}>{data2.name[0]}{data2.surname[0]}</div>
                    </Col>
                    <Col push={1}>
                        {data2.name} {data2.surname}
                        <div className='secondary'>{data2.email}</div>
                    </Col>
                </Row>,
        },
        {
            key: 'date',
            title: 'Date Joined',
            dataIndex: 'date',
            render: (date) => <p>{date}</p>
        },
        {
            key: 'roles',
            title: 'Roles',
            render: (record) => <Select defaultValue={record.roles} options={[
                {
                    value: 'Manager',
                    label: 'Manager',
                },
                {
                    value: 'Employee',
                    label: 'Employee',
                },
                {
                    value: 'Founder',
                    label: 'Founder',
                },
            ]} onChange={(value) => { setTemproles2([record.data2.email, value]) }} />
        },
        {
            key: 'action',
            title: 'Action',
            render: (record) => <Button type='default'>Revoke</Button>
        },
    ];
    const [data, setData] = useState([
        {
            key: '1',
            data: {
                name: 'Vitalik',
                surname: 'Armstrong',
                email: 'vitalik.a@bico.com',
                state: 'Pending',
            },
            date: 'Dec 05, 2022',
            roles: 'Manager'
        },
        {
            key: '2',
            data: {
                name: 'Brian',
                surname: 'Zhao',
                email: 'brian.z@bico.com',
                state: 'Expired',
            },
            date: 'Dec 03, 2022',
            roles: 'Manager'
        },
        {
            key: '3',
            data: {
                name: 'Pavel',
                surname: 'Nakamoto',
                email: 'pavel.n@bico.com',
                state: 'Pending',
            },
            date: 'Dec 03, 2022',
            roles: 'Manager'
        },
    ])
    const [data2, setData2] = useState([
        {
            key: '1',
            data2: {
                name: 'Charlie',
                surname: 'Pomp',
                email: 'charlie.p@bico.com',
            },
            date: 'Dec 01, 2022',
            roles: 'Founder'
        },
        {
            key: '2',
            data2: {
                name: 'Brian',
                surname: 'Zhao',
                email: 'brian.z@bico.com',
            },
            date: 'Dec 01, 2022',
            roles: 'Founder'
        },
        {
            key: '3',
            data2: {
                name: 'Pavel',
                surname: 'Nakamoto',
                email: 'pavel.n@bico.com',
            },
            date: 'Dec 02, 2022',
            roles: 'Manager'
        },
        {
            key: '4',
            data2: {
                name: 'Vitalik',
                surname: 'Armstrong',
                email: 'vitalik.a@bico.com',
            },
            date: 'Dec 02, 2022',
            roles: 'Manager'
        },
    ])
    const [key, setkey] = useState(4)
    const [tempemail, setTempemail] = useState('')
    const [temproles, setTemproles] = useState('')

    const [temproles2, setTemproles2] = useState([])

    const [usersToAdd, setUsersToAdd] = useState([])
    const [update, updateState] = useState(false);

    function handleclick() {
        setUsersToAdd(current => [...current, { email: tempemail, roles: temproles }])
    }

    const Delete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this?",
            onOk: () => {
                setData((pre) => {
                    return pre.filter((person) => person.data.email != record.data.email);
                });
            },
        });
    };

    // const Edit = (record) => {
    //     console.log(temproles2)
    //     if (record.data2.email == temproles2[0]) {
    //         Modal.confirm({
    //             title: "Are you sure you want to edit this?",
    //             onOk: () => {
    //                 const match = data2.filter((person) => person.data2.email == record.email)
    //                 match.roles = temproles2[1]
    //                 const notmatch = data2.filter((person) => person.data2.email != record.email)
    //                 notmatch.push(match)
    //                 setData2(notmatch)
    //                 console.log(data2)
    //             },
    //         });
    //     }
    // };

    function handleSend() {
        usersToAdd.forEach((user) => {
            const email = user.email
            const roles = user.roles
            const today = new Date()
            setData(current => [...current,
            {
                key: key,
                data: {
                    name: '',
                    surname: '',
                    email: email,
                    state: 'Pending',
                },
                date: `${today.getUTCMonth()} ${today.getDate()}, ${today.getFullYear()}`,
                roles: roles
            },
            ])
            setkey(key + 1)
        })
        setUsersToAdd([])
    }

    useEffect(() => {
        updateState(true)
    }, [usersToAdd, data]);

    return (
        <div className="TeamPage">
            <Row>
                <Col className='sotext' span={6}>
                    <h2>Invite Team</h2>
                    <p className='secondary'>Invite team members to your organization</p>
                </Col>
                <Col className='sotext' span={18}>
                    <Row>

                        <p>Your company email</p>

                    </Row>

                    <Input className='input1' placeholder="satoshi.s@bico.io" onChange={(event) => setTempemail(event.target.value)} />
                    <Select defaultValue="Member" options={[
                        {
                            value: 'Manager',
                            label: 'Manager',
                        },
                        {
                            value: 'Employee',
                            label: 'Employee',
                        },
                        {
                            value: 'Founder',
                            label: 'Founder',
                        },
                    ]} onChange={(value) => { setTemproles(value) }} />

                    {update == true ?
                        usersToAdd.map((user) => {
                            return <Row key={usersToAdd.indexOf(user)}>
                                <p>{user.email} {user.roles}</p>
                            </Row>
                        })
                        : ''
                    }

                    <Row style={{ paddingTop: '20px' }}>
                        <Button type='default' onClick={handleclick}>
                            <PlusOutlined /> Add new member
                        </Button>
                    </Row>

                    <Row style={{ paddingTop: '20px' }}>
                        <Button type='primary' onClick={handleSend}>
                            Send Invite
                        </Button>
                    </Row>


                    <Table columns={columns} dataSource={data} />


                </Col>
            </Row>

            <Row>
                <Col className='sotext' span={6}>
                    <h2>Team Members</h2>
                    <p className='secondary'>Current Team Members</p>
                </Col>


                <Table columns={columns2} dataSource={data2} />

            </Row>

        </div>
    );
}

export default TeamPage;
