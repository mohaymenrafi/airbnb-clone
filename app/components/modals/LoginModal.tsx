"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const route = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				toast.success("Logged in");
				route.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome Back" subtitle="Login to your account!" />
			<Input
				register={register}
				id="email"
				label="Email"
				disabled={isLoading}
				errors={errors}
				required
			/>

			<Input
				register={register}
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			{/* <Button
				outline
				label="Continue with Google"
				onClick={() => {}}
				icon={FcGoogle}
			/> */}
			<Button
				outline
				label="Continue with Github"
				onClick={() => signIn("github")}
				icon={AiFillGithub}
			/>
			<div className="text-neutral-500 mt-4 font-light text-center">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Already have an account?</div>
					<div
						className="text-neutral-800 hover:underline cursor-pointer"
						onClick={registerModal.onClose}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
