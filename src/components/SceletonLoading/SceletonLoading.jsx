import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import s from "./SceletonLoading.module.sass";

export const SceletonCardVacancy = () => {
  return (
    <>
      {Array(8)
        .fill()
        .map((_, i) => (
          <Stack key={i} spacing={1} className={s.card}>
            <div className={s.box}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={"60%"} sx={{ fontSize: "1rem" }} />
            </div>
            <div className={s.box_rounded}>
              <div>
                <Skeleton
                  variant="rectangular"
                  width={70}
                  height={10}
                  style={{ marginBottom: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={50}
                  height={10}
                  style={{ marginBottom: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={20}
                  style={{ marginBottom: 40 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={10}
                  style={{ marginBottom: 10 }}
                />
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>

              <Skeleton variant="rounded" width={"100%"} height={30} />
            </div>
          </Stack>
        ))}
    </>
  );
};

export const SceletonCardStudents = () => {
  return (
    <>
      {Array(8)
        .fill()
        .map((_, i) => (
          <Stack key={i} spacing={1} className={s.card} style={{ height: 290 }}>
            <div className={s.box}>
              <Skeleton variant="circular" width={60} height={60} />
              <Skeleton variant="text" width={"60%"} sx={{ fontSize: "1rem" }} />
            </div>
            <div className={s.box_rounded}>
              <div>
                <Skeleton
                  variant="rectangular"
                  width={50}
                  height={10}
                  style={{ marginBottom: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={10}
                  style={{ marginBottom: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={50}
                  style={{ marginBottom: 30 }}
                />
              </div>

              <Skeleton variant="rounded" width={120} height={30} />
            </div>
          </Stack>
        ))}
    </>
  );
};
