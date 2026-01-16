import { useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import { getUserById} from "../../api/users";
import { getAllRoles } from "../../api/roles";

const UserForm = ({onUserSave}) => {

  const params = useParams();
  const userId = params.userId ?? 0;

  const [user, setUser] = useState({id:0, firstName:"", lastName:"", email:"", roleId:2, active:true});
  const [roleOptions, setRoleOptions] = useState([]); // to populate the dropdown
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // If there is a userId, get the users info
    if(userId){
      getUserById(userId).then(u => setUser(u)).catch(err => console.log(err))
    } else {
      // Reset to empty form when no userId (add mode)
      setUser({id:0, firstName:"", lastName:"", email:"", roleId:2, active:true});
    }
  }, [userId])
  
  useEffect(() => {
    // get all the roles so we can populate the dropdown
    getAllRoles().then(roles => {
      setRoleOptions(roles)
    }).catch(err => console.log(err))
  }, [])

  async function handleSubmit(evt){
    evt.preventDefault();
    if(validate()){
      //console.log("VALID!!!")
      setErrors({})
      onUserSave({...user, password});
    }
  }

  function validate(){
    let isValid = true;
    setErrors({});

    if(!user.firstName){
      setErrors(prev => ({...prev, firstName: "First name is required"}))
      isValid = false;
    }

    if(!user.lastName){
      setErrors(prev => ({...prev, lastName: "Last name is required"}))
      isValid = false;
    }

    if(!user.email){
      setErrors(prev => ({...prev, email: "Email address is required"}))
      isValid = false;
    }else if(!validateEmailAddress(user.email)){
      setErrors(prev => ({...prev, email: "Email address is not valid"}))
      isValid = false;
    }

    // FOR THE PASSWORD:
    // If we are editing an existing user (the userId route param is > 0)
    //    - the password is NOT required (which indicates that although we are editing the user, the password is not changing)
    //    - but it the password is NOT empty, then it must match confirmPassword
    //    - if the password is NOT empty, it must be at least 8 characters
    // If we are creating a new user
    //    - then the password is required 
    //    - and it must match the confirm password
    //    - the password must be at least 8 characters
    if(userId){
      if(password && (password !== confirmPassword)){
        setErrors(prev => ({...prev, password: "The passwords do not match"}))
        isValid = false;
      }else if(password && password.length < 8){
        setErrors(prev => ({...prev, password: "The password must be at least 8 characters"}))
        isValid = false;
      }
    }else{
      if(!password){
        setErrors(prev => ({...prev, password: "Password is required"}))
        isValid = false;
      }else if(password !== confirmPassword){
        setErrors(prev => ({...prev, password: "The passwords do not match"}))
        isValid = false;
      }else if(password.length < 8){
        setErrors(prev => ({...prev, password: "The password must be at least 8 characters"}))
        isValid = false;
      }
    }
   
    return isValid;
  }

  function validateEmailAddress(email){
    const regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regExp.test(email);
  }


  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" value={user.firstName} onChange={ evt => setUser(prev => ({...prev, firstName: evt.target.value}))} />
        {errors.firstName && <div className="validation">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" value={user.lastName} onChange={ evt => setUser(prev => ({...prev, lastName: evt.target.value}))}  />
        {errors.lastName && <div className="validation">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email</label>
        <input type="text" value={user.email} onChange={ evt => setUser(prev => ({...prev, email: evt.target.value}))}  />
        {errors.email && <div className="validation">{errors.email}</div>}
      </div>
      <div>
        <label>Role</label>
        <select value={user.roleId} onChange={evt => setUser(prev => ({...prev, roleId: Number(evt.target.value)}))}>
          {roleOptions.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
        </select>
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={evt => setPassword(evt.target.value)}/>
      </div>
      {errors.password && <div className="validation">{errors.password}</div>}
      <div>
        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={evt => setConfirmPassword(evt.target.value)}/>
      </div>
      <div>
        <input type="checkbox" checked={user?.active} onChange={evt => setUser(prev => ({...prev, active: evt.target.checked}))} />
        <label>Active</label>
      </div>
      <button>Save</button>
    </form>
  )
}

export default UserForm