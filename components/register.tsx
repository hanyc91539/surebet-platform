'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailboxIcon, PasswordIcon, LoginIcon, UsernameIcon } from "./icons";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ERROR, SUCCESS } from "@/config/toast";
import { data } from "autoprefixer";
import { notify } from "@/utils/notify";


export default function Register() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { data: session, status: sessionStatus } = useSession();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        is_admin: false,
        products: []
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
        if (!formData.name) {
            notify(ERROR, "Full name is empty")
            return;
        }

        if (!isValidEmail(formData.email)) {
            notify(ERROR, "Email is invalid");
            return;
        }

        if (!formData.password || formData.password.length < 8) {
            notify(ERROR, "Password is invalid");
            return;
        }

        if (formData.confirmPassword !== formData.password) {
            notify(ERROR, "Passwords are not equal");
            return;
        }

        if (sessionStatus !== "authenticated") {
            try {
                const res = await fetch("/api/create/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (res.status === 400) {
                    notify(ERROR, "The email already in use");
                }
                if (res.status === 200) {
                    notify(SUCCESS, "Registration successful")
                }
            } catch (err) {
                notify(ERROR, "Error, try again");
            }
        }
        else {
            notify(ERROR, "Already authenticated");
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
                    Register
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
                                    <UsernameIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                name="name"
                                label="name"
                                placeholder="Enter your name"
                                variant="bordered"
                                onChange={handleChange}
                                required
                            />
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
                            <Input
                                endContent={
                                    <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                type="password"
                                variant="bordered"
                                onChange={handleChange}
                                required
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button className="w-full mb-4" onClick={handleSubmit}>Register</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        ));
}
