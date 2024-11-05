'use client'
import React, { useState, useEffect } from "react";
import { User, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { AddIcon, DeleteIcon, EditIcon } from "@/components/icons";
import { notify } from "@/utils/notify";
import { ERROR, SUCCESS } from "@/config/toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


export default function BlogPage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [clickedAdd, setAddFlag] = useState(false)
	const [clickedDelete, setDeleteFlag] = useState(false)
	const [clickedEdit, setEditFlag] = useState(false)
	const [textAdd, setTextAdd] = useState("")
	const [textEdit, setTextEdit] = useState("")

	const [data, setData] = useState([])
	const [selectedId, setId] = useState("")

	const clickedAddButton = () => {
		setAddFlag(true)
		setDeleteFlag(false)
		setEditFlag(false)
	}
	const clickedDeleteButton = (id: string) => {
		setAddFlag(false)
		setDeleteFlag(true)
		setEditFlag(false)
		setId(id)
	}
	const clickedEditButton = () => {
		setAddFlag(false)
		setDeleteFlag(false)
		setEditFlag(true)
	}

	const onValueChangeAddTextarea = (value: string) => {
		setTextAdd(value)
	}

	const onValueChangeEditTextarea = (value: string) => {
		setTextEdit(value)
	}

	const readAllArticles = async () => {
		try{
			const response = await fetch("/api/read/review/all")
			const result = await response.json()
			setData(result)
		}
		catch(error){
			console.log(error)
		}
	}
	useEffect(() => {
		readAllArticles()
	}, [])

	const addNewArticle = async () => {
		try {
			const res = await fetch("/api/create/review", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userid: "12345", content: textAdd }),
			});
			if (res.status === 400) {
				notify(ERROR, "unexpected error");
			}
			if (res.status === 200) {
				notify(SUCCESS, "added successfully")
				readAllArticles()
			}
		} catch (err) {
			notify(ERROR, "Error, try again");
		}
	}

	const editArticle = async () => {
		try {
			const res = await fetch("/api/update/review", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: "66024c17f132ae43f2e6602a", content: textEdit }),
			});
			if (res.status === 400) {
				notify(ERROR, "unexpected error");
			}
			if (res.status === 200) {
				notify(SUCCESS, "updated successfully")
				readAllArticles()
			}
		} catch (err) {
			notify(ERROR, "Error, try again");
		}
	}

	const deleteArticle = async () => {
		try {
			const response = await fetch(`/api/delete/review/${selectedId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
			const result = await response.json();
			readAllArticles();
			console.log(result)
		}
		catch(error){
			console.log(error)
		}
	}

	return (
		<div className="space-y-3 max-w-5xl mx-auto">
			<div className="flex justify-between items-baseline">
				<p>There are {data.length} articles</p>
				<Button startContent={<AddIcon />} onPress={onOpen} onClick={clickedAddButton}> Add new article </Button>
			</div>
			<ul className="space-y-3">
				{data.map((item, index) => (
					<li key={index} className="border rounded-lg px-10 py-5">
						<div className="flex justify-between">
							<User
								name={item["userid"]}
								description={item["updatedAt"]}
							/>
							<div className="flex gap-1">
								<Button isIconOnly endContent={<EditIcon />} onPress={onOpen} onClick={clickedEditButton} />
								<Button isIconOnly endContent={<DeleteIcon />} onPress={onOpen} onClick={() => clickedDeleteButton(item["_id"])} />
							</div>
						</div>
						<p className="mx-5">
							{item["content"]}
						</p>
					</li>
				))}
			</ul>

			{clickedDelete && <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Question</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this data?</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button color="primary" onPress={onClose} onClick={deleteArticle}>
									Agree
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>}

			{clickedAdd && <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Add New Article</ModalHeader>
							<ModalBody>
								<Textarea placeholder="Type here" onValueChange={onValueChangeAddTextarea} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button color="primary" onPress={onClose} onClick={addNewArticle}>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>}

			{clickedEdit && <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit Article</ModalHeader>
							<ModalBody>
								<Textarea placeholder="Type here" onValueChange={onValueChangeEditTextarea} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button color="primary" onPress={onClose} onClick={editArticle}>
									Update
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>}
		</div>
	);
}
