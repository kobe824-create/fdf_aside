"use client";
import SelectFormField from "@/components/selectFormField";
import { useRouter } from "next/navigation";

export default function Members() {
  const router = useRouter();
  return (
    <div className="members-page">
      <div className="members-page-heading">
        <div className="member-search">
          <label>Quick search a member</label>
          <div className="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.8045 14.8625L11.8252 10.8831C12.9096 9.55686 13.4428 7.86453 13.3144 6.15617C13.1861 4.44782 12.406 2.85415 11.1356 1.70481C9.86516 0.555472 8.20158 -0.0616068 6.48895 -0.0187856C4.77632 0.0240356 3.14566 0.723481 1.93426 1.93487C0.72287 3.14627 0.0234252 4.77693 -0.019396 6.48956C-0.0622172 8.20219 0.554862 9.86577 1.7042 11.1362C2.85354 12.4066 4.44721 13.1867 6.15556 13.315C7.86392 13.4434 9.55625 12.9102 10.8825 11.8258L14.8619 15.8051C14.9876 15.9266 15.156 15.9938 15.3308 15.9922C15.5056 15.9907 15.6728 15.9206 15.7964 15.797C15.92 15.6734 15.9901 15.5062 15.9916 15.3314C15.9932 15.1566 15.926 14.9882 15.8045 14.8625ZM6.66652 12.0005C5.61169 12.0005 4.58054 11.6877 3.70348 11.1016C2.82642 10.5156 2.14283 9.68265 1.73916 8.70811C1.3355 7.73357 1.22988 6.66122 1.43567 5.62665C1.64145 4.59208 2.14941 3.64178 2.89529 2.8959C3.64117 2.15002 4.59147 1.64206 5.62604 1.43628C6.6606 1.23049 7.73296 1.33611 8.7075 1.73977C9.68204 2.14344 10.515 2.82703 11.101 3.70409C11.6871 4.58115 11.9999 5.6123 11.9999 6.66713C11.9983 8.08113 11.4359 9.43676 10.436 10.4366C9.43615 11.4365 8.08052 11.9989 6.66652 12.0005Z" fill="#727A90" />
            </svg>
            <input type="text" placeholder="Enter Search word" />
          </div>
        </div>
        <div className="totalMember">
          <h3>250</h3>
          <p>Total number of member</p>
        </div>
        <div className="member-filter-cont">
          <SelectFormField
            label="Filter by"
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>2</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>3</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>4</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>5</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>6</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>7</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>8</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
            <tr>
              <td>9</td>
              <td>John</td>
              <td>Doe</td>
              <td>Male</td>
              <td>123456</td>
              <td>08012345678</td>
              <td>Admin</td>
              <td>ViewMore</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}