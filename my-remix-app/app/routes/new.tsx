import {MetaFunction} from "@remix-run/node";
import {useNavigate} from "@remix-run/react";
import BaseDialog from "~/components/dialogs/base-dialog/BaseDialog";
import MovieForm from "~/components/dialogs/movie-dialog/movie-form/MovieForm";
import {NewMovie} from "~/models/movies";
import useSaveMovie from "~/hooks/UseSaveMovie";

export const meta: MetaFunction = () => {
  return [
    { title: "new Movie" },
    { name: "description", content: "Add new movie" },
  ];
};

export default function New() {
  const {createMovie} = useSaveMovie();
  const navigate = useNavigate();
  const onClose = (): void => {
    navigate(-1);
  }

  const onSubmitChanges = async (movie: NewMovie) => {
    await createMovie(movie);

    onClose();
  }

  return (
      <BaseDialog title="Add new Movie" onClose={onClose}>
        <MovieForm onClose={onClose} onSubmitChanges={onSubmitChanges}/>
      </BaseDialog>
  );
}
