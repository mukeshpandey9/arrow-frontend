import React from "react";

const AdminProfileUpdate = ({ handleSubmit, value, setValue }) => {
  return (
    <form className="form-user-profile" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Name"
          autoFocus
          style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={value.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Email "
          disabled
          style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          value={value.password}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Password"
          style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.phone}
          onChange={(e) => setValue({ ...value, phone: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Phone"
          style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address}
          onChange={(e) => setValue({ ...value, address: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Address"
          style={{ width: "83%" }}
        />
      </div>
      <button type="submit" className="profile-update-Butn">
        UPDATE
      </button>
    </form>
  );
};

export default AdminProfileUpdate;
