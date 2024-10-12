import { IfElse, Input, Portal, Snackbar, Thumbnail, Toast } from "@ds";
import { UserCard } from "../components/UserCard/UserCard";
import ShroodEmpty from "@assets/images/shrood_empty.webp";

// styles
import "./Layout.scss";
import { useLayout } from "./useLayout";

export const Layout = () => {
  const {
    handleSelectUserAndBattle,
    handleAddNewUser,
    handleDeleteUser,
    setIsToasterOpen,
    isToasterOpen,
    setFormData,
    formData,
    users,
  } = useLayout();

  return (
    <div className='layout-09lk'>
      <Portal>
        <Snackbar
          onClose={() => setIsToasterOpen(false)}
          open={isToasterOpen}
          autoHideDuration={4000}
        >
          <Toast type='danger' title={"Missing fields!"}>
            Please fill in all the fields.
          </Toast>
        </Snackbar>
      </Portal>
      <h3 className='mb-6'>Players 🎮</h3>
      <div className='d-flex align-items-center justify-content-start gap-4 mb-4'>
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <Input
            placeholder='Enter players name'
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, name: value })
            }
            value={formData.name}
          />
          <Input
            placeholder='Enter players avatar'
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, avatar: value })
            }
            value={formData.avatar}
          />
        </div>
        <button className='bg-nu color-alpha' onClick={handleAddNewUser}>
          <ion-icon name='add-outline' />
        </button>
      </div>
      <IfElse condition={users.length === 0}>
        <div className='layout-09lk__empty'>
          <Thumbnail
            alt='A Purple rooky looking into an empty box'
            className='w-100'
            src={ShroodEmpty}
          />
          <p className='text-center'>There are no users!</p>
        </div>
        <div className='layout-09lk__users'>
          {users.map((user) => (
            <UserCard
              handleSelectUser={handleSelectUserAndBattle}
              handleDeleteUser={handleDeleteUser}
              key={user.name}
              user={user}
            />
          ))}
        </div>
      </IfElse>
    </div>
  );
};
