import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import { SignUp, action as SignUpAction } from './pages/SignUp';
import { LogIn, action as LogInAction, loader as LoginLoader } from './pages/LogIn';
import { Dashboard } from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DiaryForm, action as DiaryAction } from '../components/Diary/DiaryForm';
import { AddDiary } from '../components/Diary/addDiary';

// import { action as addDiaryAction } from '../components/Diary/addDiary';

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<App />} loader={LoginLoader}>
			<Route path="/sign-up" element={<SignUp />} action={SignUpAction} loader={LoginLoader} />
			<Route index element={<LogIn />} loader={LoginLoader}/>
		
		</Route>,
		<Route path="/dashboard" element={<Dashboard />} >
			<Route index element={ <AddDiary />}/>
      		<Route path='diary' element={ <DiaryForm/>} action={DiaryAction}/>


    </Route>
	])
)

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>,
)
