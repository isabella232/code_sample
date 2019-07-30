import React, { useState, useEffect, createContext } from 'react';
import PageWrapper from '../components/PageWrapper';
import AddTaskForm from '../tasks/AddTaskForm';
import TasksList from '../tasks/TasksList';

export const Context = createContext(['', ()=>{}])

export default () => {
    const query = {
        isPrivate: false
    }
    const [tasksList, setTasks] = useState([])
    const [lastUpdate, setLastUpdate] = useState('')

    useEffect(() => {
        const fetchData = () => {
            Meteor.call(`tasks.get`, { query, params: {} }, (err, items) => {
                if (!err) {
                    setTasks(items);
                } else {
                    console.error(err)
                }
            });
        };
        fetchData();
    }, [lastUpdate]);


    return (
        <Context.Provider value={[lastUpdate, setLastUpdate]}>
            <PageWrapper title="Tasks" pageClassName="main-tasks-page" hasBackButton>
                <AddTaskForm />
                <div className="groups-wrapper">
                    <TasksList title="Incomplete" open items={tasksList.filter(({ status }) => status === 'incomplete' )} />
                    <TasksList title="Completed" open items={tasksList.filter(({ status }) => status === 'completed' )} />
                </div>
            </PageWrapper>
        </Context.Provider>
    )
}