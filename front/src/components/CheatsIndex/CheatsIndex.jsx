import React, { useState, useEffect, useContext } from "react";
import CheatService from "../../services/Cheat";
import "./CheatsIndex.css";
import { FilteredCheatsContext } from "../../utils/Context";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

export default function ActionAreaCard() {
  const navigate = useNavigate();
  const contextValue = useContext(FilteredCheatsContext);
  const [cheats, setCheats] = useState([]);
  const activeSearch = localStorage.getItem("search");
  console.log("activeSearch", activeSearch);
  useEffect(() => {
    getAllCheats();
  }, []);
  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getAllCheats() {
    await CheatService.findAll().then((response) => {
      let result = response.data.data.map((cheat) => {
        cheat.createdAt = moment(cheat.createdAt).format(" HH:mm DD/MM/YYYY");
        cheat.title =
          cheat.title.charAt(0).toUpperCase() + cheat.title.slice(1);
        return cheat;
      });
      setCheats(result);
    });
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleDisplayCheatsIndex = () => {
  //   if (cheats.length > 0) {
  //     return (
  //       <TableBody>
  //         {cheats.map((cheat) => (
  //           <TableRow className="cheatCard_container" sx={{ maxWidth: 345 }}>
  //             <span className="material-symbols-outlined addBookIndex">
  //               add_circle
  //             </span>
  //             <div className="blurIndex"></div>
  //             <img src={cheat.image} alt="green iguana" />
  //             <div className="cheat_cardDescription">
  //               <h2 className="cheatTitle">{cheat.title}</h2>
  //               <p className="cheatDesc">{cheat.description}</p>
  //               <div className="init_cheat">
  //                 <p className="cheat_creator">{cheat.creator}</p>
  //                 <p className="cheat_created">{cheat.createdAt}</p>
  //               </div>
  //             </div>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     );
  //   }
  // };

  const handleDisplayFilteredCheats = () => {
    if (contextValue.filteredCheats && contextValue.filteredCheats.length > 0) {
      return (
        <div className="ffff">
          <Table aria-label="simple table">
            <TableBody>
              {contextValue.filteredCheats.map((cheat) => {
                return (
                  <TableRow key={cheat.id} className="cheat_cardIndex">
                    <span className="material-symbols-outlined addBookIndex">
                      add_circle
                    </span>
                    <div className="blurIndex"></div>
                    <img src={cheat.image} alt="green iguana" />
                    <div className="cheat_cardDescription">
                      <h2 className="cheatTitle">{cheat.title}</h2>
                      <p className="cheatDesc">{cheat.description}</p>
                      <div className="init_cheat">
                        <p className="cheat_creator">{cheat.creator}</p>
                        <p className="cheat_created">{cheat.createdAt}</p>
                      </div>
                    </div>
                  </TableRow>
                );
              })}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={cheats.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </div>
      );
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="cheats_container">
      {activeSearch === false ? (
        <section className="cheatsIndex">
          {/* {contextValue.filteredCheats.length === 0 && handleDisplayCheatsIndex()} */}
          {contextValue.filteredCheats && handleDisplayFilteredCheats()}
          <Table aria-label="simple table">
            <TableBody>
              {cheats
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cheat) => (
                  <TableRow
                    key={cheat.id}
                    className="cheat_cardIndex"
                    onClick={() => handleNavigation(`/cheat/${cheat.id}`)}
                  >
                    <span className="material-symbols-outlined addBookIndex">
                      add_circle
                    </span>
                    <div className="blurIndex"></div>
                    <img src={cheat.image} alt="green iguana" />
                    <div className="cheat_cardDescription">
                      <h2 className="cheatTitle">{cheat.title}</h2>
                      <p className="cheatDesc">{cheat.description}</p>
                      <div className="init_cheat">
                        <p className="cheat_creator">{cheat.creator}</p>
                        <p className="cheat_created">{cheat.createdAt}</p>
                      </div>
                    </div>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={cheats.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </section>
      ) : null}
    </div>
  );
}
