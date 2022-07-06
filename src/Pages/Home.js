import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';

function Home() {
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
        navigate("/");
    }
}
  const [list, setList] = useState([]);
  let navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    list: "",
  });
  const handleSubmit = async (e ) => {
    e.preventDefault();
    
    
    if (handleValidation()) {
      const { list } = value;
      const data = await axios.post("http://localhost:8080/createList", { list }, {
        headers: {
          Authorization: window.localStorage.getItem('myapptoken'),
        },
      })
      if (data.data.message === "Unauthorized") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "added") {
        toast.success("SuccessFully Added", toastOptions)
      }
    };
    fetchAll();
  };

  const handleValidation = () => {
    const { list } = value;
    if (list === "") {
      toast.error("List is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  async function fetchAll() {
    try {
      let listData = await axios.get('http://localhost:8080/getList', {
        headers: {
          Authorization: window.localStorage.getItem('myapptoken'),
        },
      });
      setList(listData.data);
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }

  useEffect(() => {
    fetchAll();
    fetchData()
  }, []);

  let handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteList/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem('myapptoken'),
        },
      });
      fetchAll();
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  };
  return (
    <>

      <div className='home-container'>
        <Navbar />
        <div className="container-fluid">
          <div className="container">
            <div className="todo-list">
              <form className="list-action" id='myForm' onSubmit={(e) => handleSubmit(e)}>
                <div className="d-flex justify-content-between">
                  <h1 className="heading mb-4">Todo List</h1>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <input type="text" class="form-control col-sm-12 look" name="list" placeholder="What to do?" onChange={(e) => handleChange(e)} min="3" />
                  <div>
                    <input type="submit" className="btn btn-primary" value="Add" />
                  </div>
                </div>
                <div className="list-content">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">List</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        list.map((lists) => {
                          return (
                            <tr>
                              <td ><input type="checkbox" id="cbox" /><label for="cbox">{lists.list}</label></td>
                              <td>
                                <button
                                  onClick={() => handleDelete(lists._id)}
                                  className="btn btn-danger btn-sm ms-2" >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>
              </form>
            </div>
          </div>

        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Home