import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../Config/database";

interface AnnouncementAttributes {
  id: number;
  title: string;
  content: string;
  start_date: Date;
  end_date?: Date | null;
}

interface AnnouncementCreationAttributes extends Optional<AnnouncementAttributes, "id" | "end_date"> {}

class Announcement
  extends Model<AnnouncementAttributes, AnnouncementCreationAttributes>
  implements AnnouncementAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public start_date!: Date;
  public end_date?: Date | null;
}

Announcement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Announcement",
    tableName: "announcements",
    timestamps: false,
  }
);

export default Announcement;
