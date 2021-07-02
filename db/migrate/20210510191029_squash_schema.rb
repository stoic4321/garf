class SquashSchema < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
    remove_column :users, :formulator
    drop_table :active_storage_attachments
    drop_table :active_storage_blobs
    drop_table :businesses
    drop_table :contact_forms
    drop_table :counties
    drop_table :custom_formulas
    drop_table :data_records
    drop_table :industries
    drop_table :metric_descriptions
    drop_table :metrics
    drop_table :recommendations
    drop_table :scores
  end

  def down
    create_table "active_storage_attachments", force: :cascade do |t|
      t.string "name", null: false
      t.string "record_type", null: false
      t.bigint "record_id", null: false
      t.bigint "blob_id", null: false
      t.datetime "created_at", null: false
      t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
      t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
    end

    create_table "active_storage_blobs", force: :cascade do |t|
      t.string "key", null: false
      t.string "filename", null: false
      t.string "content_type"
      t.text "metadata"
      t.bigint "byte_size", null: false
      t.string "checksum", null: false
      t.datetime "created_at", null: false
      t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
    end

    create_table "businesses", force: :cascade do |t|
      t.integer "user_id"
      t.integer "county_id"
      t.integer "industry_id"
      t.string "name"
      t.text "address"
      t.string "website"
      t.string "phone_number"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["county_id", "industry_id"], name: "index_businesses_on_county_id_and_industry_id"
      t.index ["county_id"], name: "index_businesses_on_county_id"
      t.index ["industry_id"], name: "index_businesses_on_industry_id"
      t.index ["user_id"], name: "index_businesses_on_user_id"
    end

    create_table "contact_forms", force: :cascade do |t|
      t.integer "origin", default: 0
      t.integer "status", default: 0
      t.string "email"
      t.string "first_name"
      t.string "last_name"
      t.string "organization"
      t.text "message"
      t.integer "sender_id"
      t.integer "archiver_id"
      t.datetime "archived_at"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["archiver_id"], name: "index_contact_forms_on_archiver_id"
      t.index ["sender_id"], name: "index_contact_forms_on_sender_id"
      t.index ["status"], name: "index_contact_forms_on_status"
    end

    create_table "counties", force: :cascade do |t|
      t.string "name"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.boolean "active", default: false
      t.float "lat"
      t.float "long"
      t.integer "bls_id"
      t.jsonb "static_data", default: "{}", null: false
      t.string "slug"
      t.index ["slug"], name: "index_counties_on_slug", unique: true
    end

    create_table "custom_formulas", force: :cascade do |t|
      t.string "name"
      t.text "formula"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end

    create_table "data_records", force: :cascade do |t|
      t.integer "county_id", null: false
      t.date "date", default: -> { "CURRENT_DATE" }, null: false
      t.datetime "timestamp", default: -> { "now()" }, null: false
      t.jsonb "data", default: "{}", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.string "connector"
      t.index ["county_id"], name: "index_data_records_on_county_id"
    end

    create_table "industries", force: :cascade do |t|
      t.string "name"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end

    create_table "metric_descriptions", force: :cascade do |t|
      t.integer "metric_id"
      t.integer "low"
      t.integer "high"
      t.text "description"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["low", "high"], name: "index_metric_descriptions_on_low_and_high"
      t.index ["metric_id"], name: "index_metric_descriptions_on_metric_id"
    end

    create_table "metrics", force: :cascade do |t|
      t.string "name"
      t.integer "parent_id", default: 0
      t.integer "children_count", default: 0, null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.text "description"
      t.string "formula"
      t.jsonb "data", default: {}
      t.float "weight", default: 0.0
      t.integer "custom_formula_id"
      t.boolean "active", default: true
      t.integer "lft"
      t.integer "rgt"
      t.integer "depth", default: 0
      t.string "rubric"
      t.index ["active"], name: "index_metrics_on_active"
      t.index ["custom_formula_id"], name: "index_metrics_on_custom_formula_id"
      t.index ["depth"], name: "index_metrics_on_depth"
      t.index ["lft"], name: "index_metrics_on_lft"
      t.index ["parent_id"], name: "index_metrics_on_parent_id"
      t.index ["rgt"], name: "index_metrics_on_rgt"
      t.index ["rubric"], name: "index_metrics_on_rubric"
    end

    create_table "recommendations", force: :cascade do |t|
      t.integer "metric_id"
      t.integer "low"
      t.integer "high"
      t.integer "effect"
      t.text "description"
      t.boolean "active", default: true
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["active", "metric_id"], name: "index_recommendations_on_active_and_metric_id"
      t.index ["active"], name: "index_recommendations_on_active"
      t.index ["low", "high"], name: "index_recommendations_on_low_and_high"
      t.index ["metric_id"], name: "index_recommendations_on_metric_id"
    end

    create_table "scores", force: :cascade do |t|
      t.integer "county_id"
      t.integer "metric_id"
      t.float "score", default: 0.0
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.date "date"
      t.text "description"
      t.index ["county_id"], name: "index_scores_on_county_id"
      t.index ["metric_id"], name: "index_scores_on_metric_id"
    end

    add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"

    add_column :users, :formulator, default: :false
  end
end
