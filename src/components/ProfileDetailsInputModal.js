"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useState } from 'react';

const ProfileDetailsInputModal = () => {

	
	const session = useSession();
	const { update } = useSession();
	
	useEffect(() => {
		if(
			!session.data?.userData?.age ||
			!session.data?.userData?.gender ||
			!session.data?.userData?.phone ||
			!session.data?.userData?.usn
		)
			document.getElementById('my_modal_1').showModal()
	}, [session])

	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("");
	const [usn, setUsn] = useState("");
	const [age, setAge] = useState(21);
	const [phone, setPhone] = useState("+91");

	useEffect(() => {
		setUsername(session?.data?.userData?.name || "" );
		setGender(session?.data?.userData?.gender || "Male" );
		setAge(session?.data?.userData?.age || 21 );
		setPhone(session?.data?.userData?.phone || "+91" );
	}, [session])

	const onReset = () => {
	}

	const onSave = async () => {
		try {
			// Construct the update object with only the fields that have changed
			const updateData = {};
			if (username !== session?.data?.userData?.name) {
				updateData.name = username;
			}
			if (gender !== session?.data?.userData?.gender) {
				updateData.gender = gender;
			}
			if (age !== session?.data?.userData?.age) {
				updateData.age = age;
			}
			if (phone !== session?.data?.userData?.phone) {
				updateData.phone = phone;
			}
			if (usn !== session?.data?.userData?.usn) {
				updateData.usn = usn;
			}

			const response = await fetch(`/api/user/update/${session?.data?.user?.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				throw new Error(`Failed to update user data. Status: ${response.status}`);
			}
			const updatedUserData = await response.json();
			console.log(updatedUserData);

			const newSession = {
				...session.data,
				userData: updatedUserData
			}
			console.log(newSession);

			await update(newSession);
			document.getElementById('my_modal_1').close();
		} catch (error) {
			console.error("Error updating user data:", error);
		}
	}

	return (
		<>
			<button
				className='btn btn-primary mr-4 self-end'
				onClick={()=>document.getElementById('my_modal_1').showModal()}
			>
				Edit User Details
			</button>

			<dialog id="my_modal_1" className="modal">
				<div className="modal-box flex flex-col">
					<h3 className="font-bold text-lg">
						Edit User Details
						{
							(!session.data?.userData?.age ||
							!session.data?.userData?.gender ||
							!session.data?.userData?.phone ||
							!session.data?.userData?.usn) &&
							(<>
								<br />
								<span className='text-error text-xs'>{"  Update all the details to continue"}</span>
							</>)
						}
					</h3>
					<div className="modal-action flex-start flex-col">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
								placeholder="Enter Title" 
								className="input input-disabled w-full max-w-xs" 
								value={session.data?.userData?.email}
								readOnly
							/>

							<label className="label mt-4">
								<span className="label-text">Name</span>
							</label>
							<input 
								type="text" 
								placeholder="User Name" 
								className="input input-bordered w-full max-w-xs" 
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>

							<label className="label mt-4">
								<span className="label-text">Phone Number</span>
							</label>
							<input
								type="text"
								placeholder="Phone Number"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
										setPhone(e.target.value);
								}}
								value={phone}
							/>
							{
								!(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) &&
								<div className="label">
									<span className="label-text-alt text-error"> {"Enter a valid Phone Number"}</span>
								</div>
							}
							<label className="label">
								<span className="label-text">Gender</span>
							</label>
							<select
								className="select select-bordered w-full max-w-xs"
								onChange={e => setGender(e.target.value)}
								value={gender}
							>
								<option>Male</option>
								<option>Female</option>
								<option>Other</option>
							</select>

							<label className="label mt-4">
								<span className="label-text">Age</span>
							</label>
							<input
								type="text"
								placeholder="Age"
								className="input input-bordered w-full max-w-xs"
								onChange={(e) => {
									const inputValue = e.target.value;
									if (inputValue === "" || !isNaN(inputValue) && Number.isInteger(parseFloat(inputValue)))
										setAge(inputValue);
								}}
								value={age}
							/>
							{
								(age < 14 || age >= 120) &&
								<div className="label">
									<span className="label-text-alt text-error"> {"13 < age < 120"}</span>
								</div>
							}
							<label className="label mt-4">
								<span className="label-text">USN/SRN</span>
							</label>
							<input 
								type="text" 
								placeholder="Enter USN/SRN" 
								className="input input-bordered w-full max-w-xs" 
								onChange={(e) => setUsn(e.target.value)}
								value={usn}
							/>
						</div>

						<div className='my-8 px-4 w-full flex-center gap-4'>
							<form method="dialog" className=' w-1/2'>
								<button 
									className="btn w-full"
									disabled={!session.data?.userData?.age ||
												!session.data?.userData?.gender ||
												!session.data?.userData?.phone ||
												!session.data?.userData?.usn}
								>
									Discard
								</button>
							</form>
							<button
								className="btn btn-primary w-1/2" 
								type='submit'
								onClick={onSave}
								disabled={
									(age < 14 || age >= 120)
									|| !(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone))
									|| usn.length < 2
								}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>	
	)
}

export default ProfileDetailsInputModal