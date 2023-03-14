import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const HomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/get-all").then((data) => {
      setImages(data.data);
      console.log(data);
    });
  }, []);

  const deleteImage = (id) => {
    console.log(id);
    axios
      .get("http://localhost:8080/api/delete-image?id=" + id)
      .then((data) => {
        setImages(
          images.filter((m) => {
            return m._id != id;
          })
        );
      });
  };
  return (
    <div style={{ width: "80%", marginLeft: "10%" }}>
      <h1>ALL IMAGES</h1>

      <Button
        onClick={() => {
          navigate("/add");
        }}
      >
        Add Image
      </Button>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Payment</Th>
              <Th>Category</Th>
              <Th>File Type</Th>
              <Th>Functions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {images
              ? images.map((m) => {
                  return (
                    <>
                      <Tr>
                        <Td>{m.Title}</Td>
                        <Td>{m.Description}</Td>
                        <Td>
                          <img style={{width:"60px", height:"60px"}} alt="" src={"http://localhost:8080/images/"+m.ImageName}  />
                        </Td>
                        <Td>{m.Sale}</Td>
                        <Td>{m.Category}</Td>
                        <Td>{m.File}</Td>
                        <Td>
                          <span
                            onClick={() => {
                              navigate("/edit", { state: { id: m._id } });
                            }}
                          >
                            Edit
                          </span>
                          <br />
                          <br />
                          <button
                            onClick={() => {
                              deleteImage(m._id);
                            }}
                          >
                            DELETE
                          </button>
                        </Td>
                      </Tr>
                    </>
                  );
                })
              : ""}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
