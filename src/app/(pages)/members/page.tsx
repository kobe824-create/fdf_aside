"use client";
import SelectFormField from "@/components/selectFormField";
import { UserTypes } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Members() {
  const router = useRouter();

  const [users, setUsers] = useState<UserTypes[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserTypes[]>([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    axios.get("/api/users/get")
      .then(res => {
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const filterUsers = (filter: string) => {
    if (filter === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.gender === filter);
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }

  const searchMember = (search: string) => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.firstname.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase()));
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }

  // Logic to get the current items based on the page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



  return (
    <div className="members-page">
      <div className="members-page-heading">
        <div className="member-search">
          <label>Quick search a member</label>
          <div className="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.8045 14.8625L11.8252 10.8831C12.9096 9.55686 13.4428 7.86453 13.3144 6.15617C13.1861 4.44782 12.406 2.85415 11.1356 1.70481C9.86516 0.555472 8.20158 -0.0616068 6.48895 -0.0187856C4.77632 0.0240356 3.14566 0.723481 1.93426 1.93487C0.72287 3.14627 0.0234252 4.77693 -0.019396 6.48956C-0.0622172 8.20219 0.554862 9.86577 1.7042 11.1362C2.85354 12.4066 4.44721 13.1867 6.15556 13.315C7.86392 13.4434 9.55625 12.9102 10.8825 11.8258L14.8619 15.8051C14.9876 15.9266 15.156 15.9938 15.3308 15.9922C15.5056 15.9907 15.6728 15.9206 15.7964 15.797C15.92 15.6734 15.9901 15.5062 15.9916 15.3314C15.9932 15.1566 15.926 14.9882 15.8045 14.8625ZM6.66652 12.0005C5.61169 12.0005 4.58054 11.6877 3.70348 11.1016C2.82642 10.5156 2.14283 9.68265 1.73916 8.70811C1.3355 7.73357 1.22988 6.66122 1.43567 5.62665C1.64145 4.59208 2.14941 3.64178 2.89529 2.8959C3.64117 2.15002 4.59147 1.64206 5.62604 1.43628C6.6606 1.23049 7.73296 1.33611 8.7075 1.73977C9.68204 2.14344 10.515 2.82703 11.101 3.70409C11.6871 4.58115 11.9999 5.6123 11.9999 6.66713C11.9983 8.08113 11.4359 9.43676 10.436 10.4366C9.43615 11.4365 8.08052 11.9989 6.66652 12.0005Z" fill="#727A90" />
            </svg>
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => {
                searchMember(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="totalMember">
          <h3>{users.length}</h3>
          <p>Total number of member</p>
        </div>
        <div className="member-filter-cont">
          <SelectFormField
            label="Filter by"
            options={[
              { value: "all", label: "All" },
              { value: "male", label: "Males" },
              { value: "female", label: "Females" }
            ]}
            onChange={(e) => {
              filterUsers(e.target.value);
            }}
          />
        </div>



        <button className="tertially-btn"
          onClick={() => {
            router.push("/addMember");
          }}
        >Add New Member</button>
      </div>
      <div className="members-table-container">
        <div className="members-table-heading">
          <h3>All Members</h3>
          <div className="members-table-top-paginate">
            <span>Showing</span>
            <p>12</p>
            <span>per page</span>
          </div>
        </div>
        <table className="members-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>Member ID</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Monthly Contribution</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              currentUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + ((currentPage - 1) * itemsPerPage)}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.gender}</td>
                    <td>{user.identification}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.role}</td>
                    <td>{user.monthlyContributionAmount}</td>
                    <td
                      onClick={() => {
                        router.push(`/member/?id=${user._id}`);
                      }}
                    >ViewMore</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        <div className="table-bottom">
          {/* <p>Showing 1-10 from 100</p> */}
          <div className="pagination">

            <div className="page" onClick={() => {
              if (currentPage > 1) {
                paginate(currentPage - 1)
              }
            }
            } style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M4.86015 9.3934L1.14015 5.66673C1.01598 5.54183 0.946289 5.37286 0.946289 5.19673C0.946289 5.02061 1.01598 4.85164 1.14015 4.72673L4.86015 1.00007C4.9534 0.906047 5.07253 0.841927 5.20236 0.815881C5.3322 0.789834 5.46684 0.803042 5.58914 0.85382C5.71143 0.904598 5.81584 0.990645 5.88904 1.10099C5.96224 1.21134 6.00092 1.34098 6.00015 1.4734V8.92007C6.00092 9.05248 5.96224 9.18212 5.88904 9.29247C5.81584 9.40282 5.71143 9.48887 5.58914 9.53965C5.46684 9.59042 5.3322 9.60363 5.20236 9.57758C5.07253 9.55153 4.9534 9.48741 4.86015 9.3934Z" fill="#727A90" />
              </svg>
            </div>


            {/* <div className="page">
              <p>1</p>
            </div>
            <div className="page">
              <p>2</p>
            </div>
            <div className="page active">
              <p>3</p>
            </div>
            <div className="page">
              <p>4</p>
            </div>
            <div className="page">
              <p>5</p>
            </div>
            <div className="page">
              <p>...</p>
            </div> */}

            {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
              <div key={index} className={`page ${ currentPage === index + 1 ? "active" : "" }`} onClick={() => paginate(index + 1)}>
                <p>{index + 1}</p>
              </div>
            ))}


            <div className="page" onClick={() => {
              if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
                paginate(currentPage + 1);
              }
            }} style={{ cursor: currentPage === Math.ceil(filteredUsers.length / itemsPerPage) ? 'not-allowed' : 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1.13985 9.3934L4.85985 5.66673C4.98402 5.54183 5.05371 5.37286 5.05371 5.19673C5.05371 5.02061 4.98402 4.85164 4.85985 4.72673L1.13985 1.00007C1.0466 0.906047 0.927473 0.841927 0.79764 0.815881C0.667801 0.789834 0.53316 0.803042 0.410852 0.85382C0.288544 0.904598 0.184135 0.990645 0.110939 1.10099C0.0377384 1.21134 0 1.34098 0 1.4734V8.92007C0 9.05248 0.0377384 9.18212 0.110939 9.29247C0.184135 9.40282 0.288544 9.48887 0.410852 9.53965C0.53316 9.59042 0.667801 9.60363 0.79764 9.57758C0.927473 9.55153 1.0466 9.48741 1.13985 9.3934Z" fill="#727A90" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}