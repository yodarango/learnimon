import { BADGE_CATCH, BADGE_IMMUNITY, BADGE_STEAL } from "@constants";
import BadgeImmunity from "@assets/images/badges/badge_immunity.webp";
import BadgeSteal from "@assets/images/badges/badge_steal.webp";
import BadgeCatch from "@assets/images/badges/badge_catch.webp";
import { HTMLProps, useEffect, useState } from "react";
import { generateRandomId } from "@utils";
import update from "immutability-helper";
import { Drawer } from "@components";

// styles
import "./UserSettings.scss";

const badgeThumbs: Record<string, any> = {
  immunity: BadgeImmunity,
  steal: BadgeSteal,
  catch: BadgeCatch,
};

const badgeTypes = [
  {
    imageUrl: "badge_steal.webp",
    name: "Steal",
    type: BADGE_STEAL,
  },
  {
    imageUrl: "badge_catch.webp",
    name: "Catch",
    type: BADGE_CATCH,
  },
  {
    imageUrl: "badge_immunity.webp",
    name: "Immunity",
    type: BADGE_IMMUNITY,
  },
];

type UserSettingsProps = {
  user: Record<string, any>;
  onClose: () => void;
  isOpen: boolean;
} & HTMLProps<HTMLDivElement>;

export const UserSettings = (props: UserSettingsProps) => {
  const { user, onClose, isOpen } = props;

  const [badges, setBadges] = useState<Record<string, any>>({
    immunity: [],
    catch: [],
    steal: [],
  });
  //add new badge to user
  function addBadgeToUser(badge: Record<string, any>) {
    badge.id = generateRandomId();

    const userData = localStorage.getItem("learnimon__users");
    const parsedData = JSON.parse(userData || "[]");

    if (!user.badges) {
      user.badges = [];
    }

    user.badges.push(badge);

    const newUserData = parsedData.map((u: Record<string, any>) =>
      u.name === user.name ? user : u
    );

    localStorage.setItem("learnimon__users", JSON.stringify(newUserData));

    // update the state
    setBadges(
      update(badges, {
        [badge.type]: {
          $push: [badge],
        },
      })
    );
  }

  // removes a badge from the user
  function removeBadgeFromUser(badge: Record<string, any>) {
    const userData = localStorage.getItem("learnimon__users");
    const parsedData = JSON.parse(userData || "[]");

    if (!user.badges || user.badges.length === 0) {
      user.badges = [];
      return;
    }

    // remove only one badge of this type do not use id
    const badgeIndex = user.badges.findIndex(
      (userBadge: Record<string, any>) => userBadge.type === badge.type
    );

    if (badgeIndex > -1) {
      user.badges.splice(badgeIndex, 1);
    }

    const newUserData = parsedData.map((u: Record<string, any>) =>
      u.name === user.name ? user : u
    );

    localStorage.setItem("learnimon__users", JSON.stringify(newUserData));

    // update the state
    setBadges(
      update(badges, {
        [badge.type]: {
          $set: user.badges.filter(
            (b: Record<string, any>) => b.type === badge.type
          ),
        },
      })
    );
  }

  // split badges into their respective types
  function splitBadges() {
    const immunity = user.badges?.filter(
      (badge: Record<string, any>) => badge.type === BADGE_IMMUNITY
    );

    const catch_ = user.badges?.filter(
      (badge: Record<string, any>) => badge.type === BADGE_CATCH
    );

    const steal = user.badges?.filter(
      (badge: Record<string, any>) => badge.type === BADGE_STEAL
    );

    return {
      catch: catch_,
      immunity,
      steal,
    };
  }

  useEffect(() => {
    setBadges(splitBadges());
  }, []);

  return (
    <Drawer
      title={`User settings (${user.name})`}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className='settings-20mn'>
        <h3 className='mb-4'>Badges</h3>
        <div className='settings-20mn__badges'>
          {badgeTypes?.map((badge: Record<string, any>) => (
            <div
              key={badge.type}
              className='d-flex align-items-center justify-content-start gap-4 bg-gamma px-4 mb-4'
            >
              <div className='d-flex align-items-center justify-content-start gap-2 settings-20mn__badges-badge'>
                <p className='settings-20mn__badge-name'>{badge.name}</p>
                <img src={badgeThumbs[badge.type]} alt='badge' />
              </div>
              <div className='ms-auto me-0 d-flex align-items-center justify-content-center gap-2'>
                <button
                  className='bg-danger color-alpha p-1'
                  onClick={() => {
                    removeBadgeFromUser(badge);
                  }}
                >
                  <ion-icon name='remove-outline' />
                </button>
                <p className='p-4 bg-mu color-alpha'>
                  {badge.type === BADGE_IMMUNITY
                    ? badges.immunity?.length
                    : badge.type === BADGE_CATCH
                    ? badges.catch?.length
                    : badges.steal?.length
                    ? badges.steal?.length
                    : 0}
                </p>
                <button
                  className='bg-success color-alpha p-1 color-beta'
                  onClick={() => {
                    addBadgeToUser(badge);
                  }}
                >
                  <ion-icon name='add-outline' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
