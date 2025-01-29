import express from "express";
import { sendJson, containsSpecialChars } from "../../utils/exepts";
import { createNewProduct  , createNewCategorie, getProductMentor} from "../mentor.repository";

export const Router = express.Router();

Router.post("/", async (request, response) => {
  const name = request.body.name;
  const instructor_id = request.user?.userdata.id!;
  const description = request.body.description;
  const category_id = request.body.category_id;
  const requerement = request.body.requerement;
  const price = request.body.price;
  const duration = request.body.duration;

  if (
    !name ||
    !instructor_id ||
    !description ||
    !category_id ||
    !requerement ||
    !duration ||
    !price
  ) {
    response
      .status(400)
      .json(sendJson({ message: "all field cant be blank!" }));
    return;
  } else if (containsSpecialChars(name) || containsSpecialChars(description)) {
    response
      .status(400)
      .json(
        sendJson({
          message: "cant contains special ( name & description) char",
        })
      );
    return;
  } else if (!Number(price) || !Number(duration) || !Number(category_id)) {
    response
      .status(400)
      .json({ message: "price,duration,rating must be number" });
    return;
  }
     else {
    try {
      const data = await createNewProduct({
        name,
        description,
        price: Number(price),
        instructor_id,
        category_id,
        duration: Number(duration),
        requerement,
      });
      console.log(data);
      response.json(sendJson({ message: "success", data }));
    } catch (err) {
      if (err && typeof err == "object" && "code" in err) {
        if (err.code == "P2002") {
          response
            .status(400)
            .json(sendJson({ message: "product name already exist!" }));
          return;
        }
      }
      response.status(500).json(sendJson({ message: "internal server error" }));
    }
  }
});

Router.get("/", async (request, response) => {
  try {
    const data = await getProductMentor(request.user?.userdata.id!);
    response.json(sendJson({ message: "success", data }));
  } catch (error) {
    response.status(500).json(sendJson({ message: "internal server error" }));
  }
})

Router.post("/category", async (request, response) => {
  const name = request.body.name;
  const slug = request.body.name || name
  const description = request.body.description;
  if (!name || !description) {
    response
      .status(400)
      .json(sendJson({ message: "all field cant be blank!" }));
    return;
  } else if (containsSpecialChars(name) || containsSpecialChars(description)) {
    response
      .status(400)
      .json(
        sendJson({
          message: "cant contains special ( name & description) char",
        })
      );
    return;
  } else {
    try {
      const data = await createNewCategorie({
        name,
        slug,
        description,
      });
      response.json(sendJson({ message: "success", data }));
      
    } catch (err) {
      if (err && typeof err == "object" && "code" in err) {
        if (err.code == "P2002") {
          response
            .status(400)
            .json(sendJson({ message: "product name already exist!" }));
          return;
        }
      }
      response.status(500).json(sendJson({ message: "internal server error" }));
    }
  }
})