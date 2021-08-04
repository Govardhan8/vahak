import { Formik, Form, useField } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import './final.scss'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

export const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div className='TextField'>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	)
}

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div className='TextField'>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	)
}

const Basic = () => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isSubmitted2, setIsSubmitted2] = useState(false)
	const [values, setValues] = useState([])
	const [values2, setValues2] = useState([])
	const [headerText, setHeaderText] = useState('Place your Bid(1/4 step)')
	const [activatePage2, setActivatePage2] = useState(false)
	const [page2OTP, setPage2OTP] = useState(false)
	const [amount, setAmount] = useState('')
	const [OTPVerified, setOTPVerified] = useState(false)
	const [otp, setOtp] = useState('')
	const [negotiable, setNegotiable] = useState(false)

	return (
		<>
			<img
				src='https://d1rgemtytdlz2g.cloudfront.net/Vahak_Blue.png'
				alt='vahak'
			/>
			<div className='stepsBar'>
				<h1>{headerText}</h1>
			</div>
			<Formik
				initialValues={{
					source: '',
					destination: '',
					carType: '',
				}}
				validationSchema={Yup.object({
					source: Yup.string().required('Source required'),
					destination: Yup.string().required('Destination required'),
					carType: Yup.string()
						.oneOf(['HachBack', 'Sedan', 'SUV'], 'Invalid car Type')
						.required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setHeaderText('Place your Bid(2/4 step)')
						setSubmitting(false)
						setIsSubmitted(true)
						setValues(values)
						setActivatePage2(true)
					}, 400)
				}}
			>
				{!isSubmitted ? (
					<div className='page1'>
						<Form>
							<div className='split'>
								<MyTextInput
									label='Source Location *'
									name='source'
									type='text'
								/>
								<MyTextInput
									label='Destination *'
									name='destination'
									type='text'
								/>
							</div>
							<MySelect label='Enter car type *' name='carType'>
								<option value=''>Select a Car type</option>
								<option value='HachBack'>HachBack</option>
								<option value='Sedan'>Sedan</option>
								<option value='SUV'>SUV</option>
							</MySelect>
							<MyTextInput
								label='Number of travellers'
								name='people'
								type='number'
							/>
							<button type='submit' className='btn'>
								Enter Bid Details
							</button>
						</Form>
					</div>
				) : (
					<div className='editbox'>
						<div className='left'>
							<h1 className='editHead'>JOURNEY DETAILS</h1>

							<h2>
								{values.source} - {values.destination}
							</h2>
							<h3>
								{values.people ? values.people + 'persons ,' : ''}{' '}
								{values.carType}
							</h3>
						</div>
						<div className='right'>
							<button
								className='edit'
								type='button'
								onClick={() => {
									setIsSubmitted(false)
									setHeaderText('Place your Bid(1/4 step)')
								}}
							>
								<CreateOutlinedIcon fontSize='medium' />
								edit
							</button>
						</div>
					</div>
				)}
			</Formik>
			{activatePage2 && (
				<div className='Page2'>
					{!isSubmitted2 && (
						<div className='AmountContainer'>
							{' '}
							<div className='Amount'>
								<h1 className='AmountSpan'>
									<span>₹</span>
									<input
										className='amountInput'
										type='text'
										value={amount}
										placeholder='0'
										onChange={(e) => {
											setAmount(e.target.value)
										}}
									/>
								</h1>
							</div>
							<div className='rateContainer'>
								<input
									type='checkbox'
									id='Rate'
									value={negotiable}
									onChange={() => {
										setNegotiable(!negotiable)
									}}
								/>
								 
								<label htmlFor='Rate' className='neg'>
									Rate Negotiable
								</label>
							</div>
						</div>
					)}

					{page2OTP ? (
						<div>
							{!isSubmitted2 && (
								<Formik
									initialValues={{
										MobileNumber: '',
										Name: '',
										Remarks: '',
									}}
									validationSchema={Yup.object({
										MobileNumber: Yup.string()
											.min(10)
											.max(10)
											.required('Please Enter Mobile Number'),
										Name: Yup.string().required('Please Enter your Name'),
									})}
									onSubmit={(values, { setSubmitting }) => {
										setTimeout(() => {
											setValues2(values)
											setSubmitting(false)
											setIsSubmitted2(true)
											setHeaderText('Verify OTP (3/4) Step')
										}, 400)
									}}
								>
									<div className='form2'>
										<Form>
											<MyTextInput
												label='Enter your 10 digit mobile number *'
												name='MobileNumber'
												type='number'
												maxLength='10'
											/>
											<MyTextInput
												label='Enter your name *'
												name='Name'
												type='text'
											/>
											<MyTextInput
												label='Enter Remarks (optional)'
												name='Remarks'
												type='text'
											/>
											<button className='btn'>Verify via OTP</button>
										</Form>
									</div>
								</Formik>
							)}
							{isSubmitted2 && (
								<div className='editable'>
									<div className='editbox second'>
										<div className='left'>
											<p className='editHead'>BID DETAILS</p>
											<h2>{values2.MobileNumber}</h2>
											<h2>{values2.Name}</h2>
											<h2>{values2.Remarks ? values2.Remarks : ''}</h2>
										</div>
										<div className='right'>
											<h1>₹{amount}</h1>
											<h2 className='editHead'>
												{negotiable ? 'Rate Negotiable' : 'fixed price'}
											</h2>
										</div>
									</div>
									{!OTPVerified ? (
										<div>
											<div className='OTPInput'>
												<p className='left'>
													We've sent an OTP to your mobile number. Please enter
													it below to submit your bid{' '}
													<b>{values2.MobileNumber}</b>
												</p>
												<button
													className='right edit'
													type='button'
													onClick={() => setIsSubmitted2(false)}
												>
													<CreateOutlinedIcon />
													edit
												</button>
											</div>

											<div id='divOuter'>
												<div id='divInner'>
													<input
														className='otpInput'
														value={otp}
														type='number'
														maxLength='4'
														onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
														onKeyPress='if(this.value.length==4) return false;'
														onChange={(e) => {
															setOtp(e.target.value)
														}}
													/>
												</div>
											</div>
											<button className='Resend btn'>
												<u>Resend OTP Again</u>
											</button>
											<button
												className='btn'
												type='button'
												onClick={() => {
													if (otp === '1234') {
														setOTPVerified(true)
														setHeaderText('Summary & Submit Bid (4/4) Step')
													}
												}}
											>
												Verify via OTP
											</button>
										</div>
									) : (
										<div>
											<div>
												<button className='bidBtn Last_submit'>
													Submit Bid
												</button>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					) : (
						<button
							className='btn'
							onClick={() => {
								setPage2OTP(true)
							}}
							type='button'
						>
							Next
						</button>
					)}
				</div>
			)}
		</>
	)
}

export default Basic
