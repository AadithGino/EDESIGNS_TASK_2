import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
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

const EditImage = () => {
  const navigate = useNavigate();
  let id = useLocation().state.id;
  const [userInfo, setuserInfo] = useState({
    file: false,
    filepreview: null,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState();
  const [ImageName,setImageName]=useState();
  const [tc, setTc] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8080/api/find-one?id=" + id).then((data) => {
      setTitle(data.data.Title);
      setDescription(data.data.Description);
      setCategory(data.data.Category);
      setPaid(data.data.Sale);
      setImageName(data.data.ImageName)
    });
  }, []);

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
    
  };

  const submit = async () => {
    const formdata = new FormData();
    if (userInfo.file != false) {
      formdata.append("avatar", userInfo.file);
    }
    formdata.append("id", id);
    formdata.append("Title", title);
    formdata.append("Description", description);
    formdata.append("Category", category);
    formdata.append("Paid", paid);
    formdata.append("TC", tc);

    axios
      .post("http://localhost:8080/api/edit", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: "50%" }}>
      <FormControl>
      <FormControl>
          <img style={{width:"60px", height:"60px"}} src={userInfo.filepreview?userInfo.filepreview:"http://localhost:8080/images/"+ImageName} alt="" />
        </FormControl>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input type="file" placeholder="Image" onChange={handleInputChange} />
        </FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          defaultValue={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          defaultValue={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          value={category}
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
          defaultValue={paid?paid:''}
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
        <br />
        <Button disabled onClick={submit} colorScheme="green">
          Save
        </Button>
      </FormControl>
    </div>
  );
};

export default EditImage;
