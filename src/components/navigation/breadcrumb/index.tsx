import React, { useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/breadcrumb/styles.css";

const Breadcrumb: React.FC<IProps> = ({ menus }) => {
  // useState
  const [pathname, setPathname] = useState<string>("");
  const [breadcrumb, setBreadcrumb] = useState<any[]>([]);

  const handleBreadcrumb = (pathname: string | undefined): void => {
    if (pathname === undefined) pathname = window.location.pathname;

    // let _menus: any, _parents: any;

    if (pathname) {
      // console.log(menus.filter(x=>x.));
      // Recursive
      // handleBreadcrumb(_menus);
    } else {
      // Recursive
      // handleBreadcrumb(_parents.parentId);
    }
  };

  // useEffects
  useEffect(() => {
    if (menus.length === 0) return;

    handleBreadcrumb(undefined);
    setPathname(window.location.pathname);
  }, [menus, pathname]);

  return (
    <nav className="ar-breadcrumb">
      {/* {breadcrumb.map((_breadcrumb) => (
        <div
          className={`${styles.breadcrumbItem} ${
            _breadcrumb.pathName.toLocaleLowerCase().replaceAll("/", "") == _useLocationLowerCase
              ? styles.activeItem
              : ""
          }`}
          key={_breadcrumb.id}
        >
          {!IsNullOrEmpty(_breadcrumb.pathName) ? (
            <Link href={`/${_breadcrumb.pathName}`}>
              <div className={styles.name}>{_breadcrumb.name}</div>
            </Link>
          ) : (
            <div className={styles.name}>{_breadcrumb.name}</div>
          )}
        </div>
      ))} */}
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";
export default Breadcrumb;
