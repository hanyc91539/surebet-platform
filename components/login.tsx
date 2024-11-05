'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailboxIcon, PasswordIcon, LoginIcon } from "./icons";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { ERROR, SUCCESS } from "@/config/toast";
import { data } from "autoprefixer";
import { notify } from "@/utils/notify";


export default function Login() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { data: session, status: sessionStatus } = useSession();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!isValidEmail(formData.email)) {
            notify(ERROR, "Email is invalid")
            return;
        }

        if (!formData.password || formData.password.length < 8) {
            notify(ERROR, "Password is invalid")
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            notify(ERROR, "Invalid email or password")
        } else {
            notify(SUCCESS, "Successful login")
        }
    };

    if (sessionStatus === "loading") {
        return <h1>Loading...</h1>;
    }
    return (
        sessionStatus !== "authenticated" && (
            <>
                <Button
                    className="text-sm font-normal text-default-600 bg-default-300"
                    variant="flat"
                    startContent={<LoginIcon />}
                    onPress={onOpen}
                >
                    Login
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                    backdrop="blur"
                    hideCloseButton
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <MailboxIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                onChange={handleChange}
                                required
                            />
                            <Input
                                endContent={
                                    <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                                onChange={handleChange}
                                required
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                                <Link color="primary" href="#" size="sm">
                                    Forgot password?
                                </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="w-full mb-4" onClick={handleSubmit}>Sign in</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        ));
}
