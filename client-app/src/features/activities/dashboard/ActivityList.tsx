import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  //const { activitiesByDate } = activityStore;
  const { groupedActivities } = activityStore;

  /*  const [target, setTarget] = useState("");

  function handleDeleteActivityButton(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  } */

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {/*           <Segment>
            <Item.Group divided> */}
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
          {/*             </Item.Group>
          </Segment> */}
        </Fragment>
      ))}
    </>
  );
});
