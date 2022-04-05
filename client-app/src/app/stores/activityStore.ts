import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues, IActivity } from "../models/activity";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
//import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInital = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  //*need to revisit this
  //---------------------------------------------------------------------------------------------------
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        //const date = activity.date!.toISOString().split("T")[0]; //take as key
        const date = format(activity.date!, "dd MMM yyyy "); //take as key
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }
  //----------------------------------------------------------------------------------------------------

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  loadActivities = async () => {
    //this.loadingInital = true; //non-asychronous code outside try catch
    this.setLoadingIntial(true);

    try {
      //const activities = await agent.Activities.list();
      const result = await agent.Activities.list(this.axiosParams);

      result.data.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setPagination(result.pagination);
      this.setLoadingIntial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingIntial(false);
    }
    /*       activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingIntial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingIntial(false);
    } */
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingIntial = (state: boolean) => {
    this.loadingInital = state;
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInital = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingIntial(false);
        return activity;
      } catch (err) {
        console.log(err);
        this.setLoadingIntial(false);
      }
    }
  };

  private setActivity = (activity: IActivity) => {
    //activity.date = activity.date.split("T")[0];
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );
      activity.host = activity.attendees?.find(
        (x) => x.userName === activity.hostUsername
      );
      activity.isHost = activity.hostUsername === user.userName;
    }
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);

    try {
      await agent.Activities.create(activity);

      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.userName;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);

      runInAction(() => {
        //this.activities.push(activity);
        //this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = newActivity;
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      if (activity.id) {
        let updatedActivity = { ...this.getActivity(activity.id), ...activity };
        this.activityRegistry.set(activity.id, updatedActivity as Activity);
        this.selectedActivity = updatedActivity as Activity;
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        //this.activities = [...this.activities.filter((x) => x.id !== id)];
        this.activityRegistry.delete(id);
        //if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);

      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.userName !== user?.userName
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }

        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivty = () => {
    this.selectedActivity = undefined;
  };

  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach((activity) => {
      activity.attendees.forEach((attendee) => {
        if (attendee.userName === username) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followingCount++;

          attendee.following = !attendee.following;
        }
      });
    });
  };
}
