import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";

const AddImage = () => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState(true);
  const [tc, setTc] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);
    formdata.append("Title", title);
    formdata.append("Description", description);
    formdata.append("Category", category);
    formdata.append("Paid", paid);
    formdata.append("TC", tc);
    console.log(tc, paid, category);

    axios
      .post("http://localhost:8080/api/add-image", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <>
      <h1>ADD IMAGE</h1>
      <div style={{ width: "50%" }}>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Image already exists!</AlertTitle>
            <AlertDescription>
              Choose another image to continue.
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input type="file" placeholder="Image" onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select Category"
          >
            <option value="Person"> Person </option>
            <option value="Tech"> Tech </option>
            <option value="Entertainment"> Entertainment </option>
          </Select>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Paid or Non Paid</FormLabel>
          <RadioGroup
            onChange={(e) => {
              console.log(e);
              setPaid(e);
            }}
            defaultValue=""
          >
            <HStack spacing="24px">
              <Radio value="Paid">Paid</Radio>
              <Radio value="Free">Free</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <Checkbox
            onChange={(e) => {
              setTc(e.target.checked);
            }}
          >
            Accept Terms And Conditions
          </Checkbox>

          <br />

          {tc ? (
            <Button disabled onClick={submit} colorScheme="green">
              Save
            </Button>
          ) : (
            <Button disabled colorScheme="gray">
              Save
            </Button>
          )}
        </FormControl>
      </div>
    </>
  );
};

export default AddImage;
